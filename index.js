const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const userController = require("./controller/userController");
const { ensureAuthenticated, isAdmin } = require("./middleware/checkAuth");

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

// Routes start here
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// 👌 Ignore for now
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);


app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

/*
app.get("/admin", isAdmin, (req, res) => {
  req.sessionStore.all((err, sessions) => {
    if (err) {
      console.log(err);
    } else {
      res.render("admin", {
        sessions: sessions,
        user:req.user,
      });
    }
  })
});

app.get("/admin/destroy/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;

  req.sessionStore.destroy(sessionId, (error) => {
    if (error) {
      console.error("Error", error)
      res.status(500).send("Error destroying the session");
    }
    res.redirect("/admin");
  })
})

Need to add an admin page
*/

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
