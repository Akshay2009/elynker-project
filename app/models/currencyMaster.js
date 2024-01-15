module.exports = (sequelize, Sequelize) => {
    const CurrencyMaster = sequelize.define("currency_master", {

      name: {
        type: Sequelize.STRING(50)
      },
      prefix: {
        type: Sequelize.STRING(3)
      },
      prefix_sign: {
        type: Sequelize.STRING(3)
      },
      country_name: {
        type: Sequelize.STRING(50)
      },
    });
  
    return CurrencyMaster;
  };
  