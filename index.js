const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, forwardAuthenticated, isAdmin } = require("./middleware/checkAuth");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());
// Routes start here
app.get("/reminders", ensureAuthenticated,reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// Login routes
app.get("/login", forwardAuthenticated, (req, res) => {
  res.render("auth/login", { hideNavbar: true });
});
app.post("/login", authController.loginSubmit);
app.get("/register", authController.register);
app.post("/register", authController.registerSubmit);

app.get("/admin", isAdmin, (req, res) => {
  req.sessionStore.all((error, sessions) => {
    if (error) {
      console.log(error);
      res.redirect("/reminders");
    } else {
      res.render("admin", { user : req.user, sessions: sessions });
    }}
  )});

app.get("/admin/destroy/:sessionId", isAdmin, (req, res) => {
  req.sessionStore.destroy(req.params.sessionId, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/admin");
    }
  });
});

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
