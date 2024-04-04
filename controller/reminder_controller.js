let  { database } = require("../database");

let remindersController = {
  isLoggedIn:(req,res) => {
    return req.isAuthenticated();
  },
  list: (req, res) => {
    let user = database.find((user) => user.email === req.user.email);
    res.render("reminder/index", { reminders: user.reminders, isLoggedIn:remindersController.isLoggedIn});
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let user = database.find((user) => user.email === req.user.email);
    let reminderToFind = req.params.id;
    let searchResult = database.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: user.reminders });
    }
  },

  create: (req, res) => {
    let user = database.find((user) => user.email === req.user.email);
    let reminder = {
      id: database.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let user = database.find((user) => user.email === req.user.email);
    let reminderToFind = req.params.id;
    let searchResult = database.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let user = database.find((user) => user.email === req.user.email);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    searchResult.completed = req.body.completed;
    res.redirect("/reminders");

  },

  delete: (req, res) => {
    let user = database.find((user) => user.email === req.user.email);
    let reminderToFind = req.params.id;
    let searchResult = database.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    user.reminders.pop(searchResult);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;