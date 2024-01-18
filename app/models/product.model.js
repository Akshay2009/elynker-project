module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      title: {
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.TEXT
      },
      type:{
        type: Sequelize.INTEGER,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      default_image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      product_images: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      sku:{
        type : Sequelize.STRING(50),
        allowNull: false,
        unique:  true
      },
      created_by: {
        type: Sequelize.NUMERIC
      },
      updated_by: {
        type: Sequelize.NUMERIC
      },
    });
  
    return Product;
  };
  