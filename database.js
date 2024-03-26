const database = [
  {
      id: 1,
      name: "Cindy Park",
      email: "cindy123@gmail.com",
      password: "cindy123!",
      reminders: [],
      role: "admin",
  },
  {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "johnny123!",
      reminders: [],
      role:"user",
  },
  {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
      reminders: [],
      role:"user",
  },
  ];
  
  const userModel = {
  findOne: (email) => {
      const user = database.find((user) => user.email === email);
      if (user) {
      return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
      const user = database.find((user) => user.id === id);
      if (user) {
      return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
  },
  };
  
  module.exports = { database, userModel };