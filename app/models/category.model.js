module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
      title: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING(200)
      },
      image_path: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      banner_image: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      parent_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.NUMERIC
      },
      updated_by: {
        type: Sequelize.NUMERIC
      },
    });
  
    return Category;
  };
  