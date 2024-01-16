const db = require("../models");
const User = db.user;
const Registration = db.registration;

/**
 * Update user details in the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the update operation.
 */

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


/**
 * Retrieve user details by user ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

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