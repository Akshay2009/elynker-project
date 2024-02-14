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

module.exports.updateUser = async function (req, res) {
  const userId = req.params.id;
  const { name, email, city, mobile_number, country_code } = req.body;
  const existingUser = await User.findByPk(userId);
  if (existingUser) {
    const [numberOfUpdatedRows, updatedRecords] = await User.update(
      { name, email, mobile_number, city, country_code },
      { where: { id: userId }, returning: true }
    );
    const registration = await Registration.update(
      { name, city },
      {
        where: {
          userId: userId,
        },
      }
    );
    return res.status(200).json(updatedRecords[0]);
  } else {
    return res.status(401).json({ error: "User Not Found " });
  }
};

/**
 * Retrieve user details by user ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.getUserById = async function (req, res) {
  const userId = req.params.id;
  console.log(userId);
  const user = await User.findByPk(userId);
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(401).json({ error: "User Not Found" });
  }
};
/**
 * Delete user details by user ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.delUserById = async function (req, res) {
  const { id } = req.params;
  // Fetch the user before deleting
  const userToDelete = await User.findByPk(id);
  if (!userToDelete) {
    return res.status(404).json({ message: "User not found" });
  }

  // Now, delete the user
  let deletedUser = await User.destroy({
    where: {
      id: id,
    },
    returning: true,
    raw: true,
  });
  if (deletedUser) {
    return res
      .status(200)
      .json({ message: "User deleted successfully", userToDelete });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
