module.exports = (sequelize, Sequelize) => {
    const CityMaster = sequelize.define("city_master", {

      name: {
        type: Sequelize.STRING(50)
      },
    }
  );
  
    return CityMaster;
  };

