// dbSync.js
const db = require('./app/models');

// force: true will drop the table if it already exists
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and Resync Database with { alter: true }");
  if(process.argv[2]=='i'){
    initial()
  }
});

const Role = db.role;

function initial() {
  Role.create({
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
