const userModel = require("../models/userModel").userModel;

const findOrCreate = (profile) => {
  let user = userModel.findBygitId({id: profile.id});
  if (user) {
    return user;
  } else {
    let user = userModel.create({
      id: profile.id,
      name: profile.username,
      provider: profile.provider,
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
