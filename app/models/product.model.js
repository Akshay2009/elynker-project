module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      title: {
        type: Sequelize.STRING(100),
        validate: {
          len: {
            args: [0, 100],
            msg: "Product Title length must be less than equal to 100 characters",
          },
        },
      },
      description: {
        type: Sequelize.TEXT
      },
      type:{
        type: Sequelize.INTEGER,
      },
      category_id:{
        type: Sequelize.STRING,
      },
      budget:{
        type: Sequelize.INTEGER,
      },
      moq:{
        type: Sequelize.INTEGER,
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
      unit:{
        type: Sequelize.STRING(50),
        
      },
      portfolio_link:{
        type: Sequelize.STRING(200),
      },
      year_of_exp:{
        type: Sequelize.STRING(20),
        
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
  