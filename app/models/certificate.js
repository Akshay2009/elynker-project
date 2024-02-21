module.exports = (sequelize, Sequelize) => {
  const Certificate = sequelize.define("certificate", {
    name: {
      type: Sequelize.STRING(50),
    },
    description: {
      type: Sequelize.STRING(500),
    },
    issued_on: {
      type: Sequelize.DATEONLY,
    },
    created_by: {
      type: Sequelize.NUMERIC,
    },
    modified_by: {
      type: Sequelize.NUMERIC,
    },
  });
  return Certificate;
};
