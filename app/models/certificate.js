module.exports = (sequelize, Sequelize) => {
  const Certificate = sequelize.define("certificate", {
    email: {
      type: Sequelize.STRING(100),
    },
    name: {
      type: Sequelize.STRING(50),
    },
    mobile_no: {
      type: Sequelize.NUMERIC(10),
    },
    otp: {
      type: Sequelize.NUMERIC(6),
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
