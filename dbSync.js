// dbSync.js
const db = require('./app/models');

// force: true will drop the table if it already exists
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and Resync Database with { alter: true }");
  // initial();
});

function initial() {
  db.Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
