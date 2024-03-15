module.exports = (sequelize, Sequelize) => {
  const RegistrationTypesMaster = sequelize.define('registration_types_master', {

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

  return RegistrationTypesMaster;
};


