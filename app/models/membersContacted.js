module.exports = (sequelize, Sequelize) => {
  const MembersContacted = sequelize.define("contacted_members", {
    member_phone: {
      type: Sequelize.STRING(10),
      allowNull: false,
      validate: {
        len: {
          args: [10, 10],
          msg: "User Mobile Number must be of 10 characters",
        },
      },
    },
    created_by: {
      type: Sequelize.NUMERIC,
    },
    updated_by: {
      type: Sequelize.NUMERIC,
    },
  });

  return MembersContacted;
};
