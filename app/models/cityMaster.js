module.exports = (sequelize, Sequelize) => {
  const CityMaster = sequelize.define('city_master', {

    name: {
      type: Sequelize.STRING(50),
    },
    created_by: {
      type: Sequelize.NUMERIC,
    },
    updated_by: {
      type: Sequelize.NUMERIC,
    },
  },
  );

  return CityMaster;
};

