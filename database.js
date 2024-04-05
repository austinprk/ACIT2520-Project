let database = [
  {
      id: 1,
      name: "Cindy Park",
      email: "cindy123@gmail.com",
      password: "cindy123!",
      reminders: [
        {
            id: 1,
            title: "Grocery shopping",
            description: "Buy milk and bread from safeway",
            completed: false,
        },
      ],
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
      reminders: [
        {
            id: 1,
            title: "Test",
            description: "Test test test",
            completed: false,
        },
      ],
      role:"user",
  },
  ];
  
//   const userModel = {
//   findOne: (email) => {
//       const user = database.find((user) => user.email === email);
//       if (user) {
//       return user;
//       }
//       throw new Error(`Couldn't find user with email: ${email}`);
//   },
//   findById: (id) => {
//       const user = database.find((user) => user.id === id);
//       if (user) {
//       return user;
//       }
//       throw new Error(`Couldn't find user with id: ${id}`);
//   },
//   };
  
  module.exports = { database };