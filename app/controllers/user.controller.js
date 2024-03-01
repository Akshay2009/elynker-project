const db = require('../models');
const User = db.user;
const Registration = db.registration;
const Sequelize = db.Sequelize;

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
