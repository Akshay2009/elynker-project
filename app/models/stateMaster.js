module.exports = (sequelize, Sequelize) => {
  const StateMaster = sequelize.define('state_master', {

    name: {
      type: Sequelize.STRING(50),
    },
  });

  return StateMaster;
};
