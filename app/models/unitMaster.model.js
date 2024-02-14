module.exports = (sequelize, Sequelize) => {
    const UnitMaster = sequelize.define("unit_master", {

      name: {
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.STRING(200)
      },
    });
  
    return UnitMaster;
  };