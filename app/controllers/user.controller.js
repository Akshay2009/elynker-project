const db = require("../models");
const User = db.user;
const Registration = db.registration;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

module.exports.updateUser = async function(req,res){
  try{
    const userId = req.params.id;
    const { name,email,city,mobile_number , country_code } = req.body;
    const existingUser = await User.findByPk(userId);
    if(existingUser){
      const [numberOfUpdatedRows, updatedRecords] = await User.update(
        { name, email, mobile_number,city,country_code },
        { where: { id: userId }, returning: true }
      );
      const registration = await Registration.update(
        {name,city},
        {
        where : {
          userId : userId
        }
      });
      res.status(200).json(updatedRecords[0]);
    }
    else{
      res.status(401).json({error : 'User Not Found '});
    }
  }catch(err){
    res.status(500).json({error : 'Internal Server Error'+err.message})
  }
}

module.exports.getUserById = async function(req,res){
  try{
    const userId = req.params.id;
    console.log(userId);
    const user =await  User.findByPk(userId);
    if(user){
      res.status(200).json(user);
    }else{
      res.status(401).json({error : 'User Not Found'});
    }

  }catch(err){
    res.status(500).json({error : 'Internal Server Error getUserById '+err.message})
  }
}