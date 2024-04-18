let  { database } = require("../database");
const https = require("https");

function unsplash_wrapper(keyword) {
  let img_url = "";
  const options = {
    hostname: "api.unsplash.com",
    path: `/search/photos?client_id=cVJHtIfCbRseVvJUttVhWUcoM4ibmpJG8P264gUVS1k&query=${keyword}`,
    method: "GET",
  }

  const req = https.request(options, (res) => {
    console.log("status code:", res.statusCode);
    // console.log("headers:", res.headers);
    res.on("data", (chunk) => {
      img_url += chunk.toString("utf-8");
    });
    res.on("end", () => {
      console.log("the stream has ended _smile_");
    });
    res.on("close", () => {
      console.log("finally done with streams pls");
      img_url = JSON.parse(img_url);
      img_url = img_url["results"][0]["urls"]["regular"];
      console.log("img_url", img_url);
    });
  });

  req.on("error", (err) => {
    console.log(err);
  });

  req.end();
}

let remindersController = {
  isLoggedIn:(req,res) => {
    return req.isAuthenticated();
  },
  list: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    res.render("reminder/index", { reminders: user.reminders, isLoggedIn:remindersController.isLoggedIn});
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: user.reminders });
    }
  },

  create: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      theme: unsplash_wrapper(req.body.theme),
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    searchResult.theme = unsplash_wrapper(req.body.theme);
    searchResult.completed = req.body.completed;
    res.redirect("/reminders");

  },

  delete: (req, res) => {
    let user = database.find((user) => user.name === req.user.name);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    user.reminders.pop(searchResult);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;