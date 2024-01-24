const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Registration = db.registration;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * Controller function to signup and save user details.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

exports.signup = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      country_code: req.body.country_code,
      mobile_number: req.body.mobile_number,
      city: req.body.city,
      //password: bcrypt.hashSync(req.body.password, 8)
    });
    if (user) {
      const registration = await Registration.create({
        name : req.body.name,
        city: req.body.city,
        isActive: true,
        registration_type: req.body.registration_type || 1,
        userId: user.id
      });
      
      if (req.body.roles) {
        const roles = await Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        });
        await user.setRoles(roles);
      }
      else {
        await user.setRoles([1]);
      }

      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

      res.send({ message: user , registration : registration,  accessToken: token});
    } else {
      res.status(500).send({ message: 'Error in creating user' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

/**
 * Controller function for get business details and signin.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.signin = async (req, res) => {
  User.findOne({
    where: {
      mobile_number: req.body.mobile_number
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

     const result = await Registration.findOne({
        where: {
          userId: user.id
        }
      })

      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          name: user.name,
          mobile_number: user.mobile_number,
          email: user.email,
          roles: authorities,
          accessToken: token,
          registration: result
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
