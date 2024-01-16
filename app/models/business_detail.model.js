module.exports = (sequelize, Sequelize) => {
    const BusinessDetail = sequelize.define("business_detail", {

      company_name: {
        type: Sequelize.STRING(50)
      },
      document: {
        type: Sequelize.STRING(200)
      },
    });
  
    return BusinessDetail;
  };
