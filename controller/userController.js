const userModel = require("../models/userModel");
let { database } = require("../database");

const findOrCreate = (email) => {
  let user = database.userModel.findOne((user) => user.email === email) ;
  if (user) {
    return user;
  } else {
    let user = userModel.create({
      email: user.email,
      name: user.name,
    });
    return user;
  }
};

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate,
};
