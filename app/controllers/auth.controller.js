const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Registration = db.registration;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// exports.signup = (req, res) => {
//   // Save User to Database
//   User.create({
//     name: req.body.name,
//     email: req.body.email,
//     country_code: req.body.country_code,
//     mobile_number: req.body.mobile_number,
//     //password: bcrypt.hashSync(req.body.password, 8)
//   })
//     .then(user => {
//       if (req.body.roles) {
//         Role.findAll({
//           where: {
//             name: {
//               [Op.or]: req.body.roles
//             }
//           }
//         }).then(roles => {
//           user.setRoles(roles).then(() => {
//             res.send({ message: user });
//           });
//         });
//       } else {
//         // user role = 1
//         user.setRoles([1]).then(() => {
//           res.send({ message: user });
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };

exports.signup = async (req, res) => {
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
      await Registration.create({
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
      res.send({ message: user });
    } else {
      res.status(500).send({ message: 'Error in creating user' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


exports.signin = (req, res) => {
  User.findOne({
    where: {
      mobile_number: req.body.mobile_number
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // var passwordIsValid = bcrypt.compareSync(
      //   req.body.password,
      //   user.password
      // );

      // if (!passwordIsValid) {
      //   return res.status(401).send({
      //     accessToken: null,
      //     message: "Invalid Password!"
      //   });
      // }

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
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
