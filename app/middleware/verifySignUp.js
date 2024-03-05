const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkMobileNumberExist = (req, res, next) =>{
  if (!req.body.mobile_number) {
    return res.status(400).send({ message: 'Mobile Number is mandatory' });
  }
  next();
};

checkDuplicateUsernameOrEmail = (req, res, next) => {
  const email = req.body.email;
  // Mobile Number
  User.findOne({
    where: {
      mobile_number: req.body.mobile_number,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Mobile Number is already in use!',
      });
      return;
    }
    // Email
    if (email) {
      User.findOne({
        where: {
          email: email,
        },
      }).then((user) => {
        if (user) {
          res.status(400).send({
            message: 'Failed! Email is already in use!',
          });
          return;
        }
      });
    }

    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Failed! Role does not exist = ' + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkMobileNumberExist: checkMobileNumberExist,
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
