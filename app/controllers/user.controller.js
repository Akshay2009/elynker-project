const db = require('../models');
const User = db.user;
const Role = db.role;
const Registration = db.registration;
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;
const logErrorToFile = require('../logger');

/**
 * Update user details in the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the update operation.
 */

module.exports.updateUser = async function(req, res) {
  const userId = req.params.id;
  const { name, email, city, mobile_number, country_code } = req.body;
  const [numberOfUpdatedRows, updatedRecords] = await User.update(
    { name, email, mobile_number, city, country_code },
    { where: { id: userId }, returning: true,
  });
  await Registration.update(
    { name, city },
    {
      where: {
        userId: userId,
      },
    },
  );
  if (numberOfUpdatedRows > 0) {
    return res.status(200).json(updatedRecords[0]);
  } else {
    return res.status(404).json({ error: 'User Not Found with this id' });
  }
};

/**
 * Retrieve user details by user ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.getUserById = async function(req, res) {
  const userId = req.params.id;
  console.log(userId);
  const user = await User.findByPk(userId);
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ error: 'User Not Found' });
  }
};
/**
 * Delete user details by user ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.delUserById = async function(req, res) {
  const { id } = req.params;
  // Fetch the user before deleting
  const userToDelete = await User.findByPk(id);
  if (!userToDelete) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Now, delete the user
  const deletedUser = await User.destroy({
    where: {
      id: id,
    },
    returning: true,
    raw: true,
  });
  if (deletedUser) {
    return res
      .status(200)
      .json({ message: 'User deleted successfully', userToDelete });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
};

/**
 * Search user details by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.search = async function(req, res) {
  try {
    console.log(req.params);
    const { fieldName, fieldValue } = req.params;
    if (!User.rawAttributes[fieldName]) {
      return res.status(400).json({ error: 'Invalid field name' });
    }
    const users = await User.findAll({
      where: {
        [fieldName]: fieldValue,
      },
    });
    if (users.length > 0) {
      return res.status(200).json({ message: 'Fetched Records', data: users });
    } else {
      return res.status(404).json({ error: 'No record found' });
    }
  } catch (err) {
    if (err instanceof Sequelize.Error) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


/**
 * Retrieve all user details from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.getAllUser = async function(req, res) {
  try {
    const UserRecords = await User.findAll({});
    if (UserRecords.length > 0) {
      return res
        .status(200)
        .json({ message: 'Details fetched successfully', data: UserRecords });
    } else {
      return res
        .status(404)
        .json({ error: 'details not found' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Create new User By admin with roles
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.userCreateByAdmin = async function (req, res) {
  try {
    const { email, name, city, country_code, mobile_number, username, is_active, roles } = req.body;
    if(!roles){
      return res.status(400).json({ error: 'Role Not Given'});
    }
    const rolesRecord = await Role.findAll({
      where: {
        name: {
          [Op.or]: roles,
        },
      },
    });
    if(rolesRecord.length===0){
      return res.status(404).json({ error: 'No Roles Found'});
    }
    const user = await User.create({
      email: email,
      name: name,
      city: city,
      country_code: country_code,
      mobile_number: mobile_number,
      username: username,
      is_active: is_active
    });
    if(user){
      await user.setRoles(rolesRecord);
      const authorities = [];
      const userRoles = await user.getRoles();
      for (let i = 0; i < userRoles.length; i++) {
        authorities.push('ROLE_' + userRoles[i].name.toUpperCase());
      }
      return res.status(201).json({ message:'User Created By Admin', user:user, roles:authorities });
    }else{
      return res.status(400).json({ error: 'Error in creating user by admin'});
    }

  } catch (err) {
    logErrorToFile.logErrorToFile(err, 'user.controller', 'createAdminUser');
    if (err instanceof Sequelize.Error) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Update User By admin 
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.updateUserByAdminById = async function(req,res){
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if(!user){
      return res.status(404).json({ error:' No user with this id'})
    }
    const { email, name, city, country_code, mobile_number, username, is_active, roles } = req.body;
    let rolesRecord =  await user.getRoles();
    if (roles) {
      rolesRecord = await Role.findAll({
        where: {
          name: {
            [Op.or]: roles,
          },
        },
      });
      if (rolesRecord.length === 0) {
        return res.status(404).json({ error: 'No Roles Found' });
      }
    }    
    const [row, record] = await User.update({
      email: email,
      name: name,
      city: city,
      country_code,
      mobile_number: mobile_number,
      username: username,
      is_active: is_active
    }, {
      where: {
        id: id,
      },
      returning: true,
    });
    if(row){
      await record[0].setRoles(rolesRecord);
      const authorities = [];
      const userRoles = await record[0].getRoles();
      for (let i = 0; i < userRoles.length; i++) {
        authorities.push('ROLE_' + userRoles[i].name.toUpperCase());
      }
      return res.status(200).json({ message:'User Updated By Admin', user:record[0], roles:authorities });
    }else{
      return res.status(404).json({ error: 'No User Found with provide id'})
    }

  } catch (err) {
    logErrorToFile.logErrorToFile(err, 'user.controller', 'updateUserByAdminById');
    if (err instanceof Sequelize.Error) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Delete User By admin 
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.deleteUserByAdminById = async function(req,res){
  try{
    const id = req.params.id;
    const userToDelete = await User.findByPk(id);
    const row = await User.destroy({
      where: {
        id:id
      }
    });
    if(row){
      return res.status(200).json({ message:'User Deleted by Admin',user: userToDelete});
    }else{
      return res.status(400).json({ error: 'No User with the id present'})
    }
  } catch (err) {
    logErrorToFile.logErrorToFile(err, 'user.controller', 'updateUserByAdminById');
    if (err instanceof Sequelize.Error) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
