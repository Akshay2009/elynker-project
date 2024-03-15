module.exports = (sequelize, Sequelize) => {
  const StateMaster = sequelize.define('state_master', {

    name: {
      type: Sequelize.STRING(50),
    },
    created_by: {
      type: Sequelize.NUMERIC,
    },
    updated_by: {
      type: Sequelize.NUMERIC,
    },
  });

  return StateMaster;
};
