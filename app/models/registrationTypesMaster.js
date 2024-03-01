module.exports = (sequelize, Sequelize) => {
  const RegistrationTypesMaster = sequelize.define('registration_types_master', {

    name: {
      type: Sequelize.STRING(50),
    },
  });

  return RegistrationTypesMaster;
};


