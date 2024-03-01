module.exports = (sequelize, Sequelize) => {
  const UnitMaster = sequelize.define('unit_master', {

    name: {
      type: Sequelize.STRING(50),
      validate: {
        len: {
          args: [0, 50],
          msg: 'name must be less than 50 characters',
        },
      },
    },
    description: {
      type: Sequelize.STRING(500),
      validate: {
        len: {
          args: [0, 500],
          msg: 'Description must be less than 500 characters',
        },
      },
    },
  });

  return UnitMaster;
};
