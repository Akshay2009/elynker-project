module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('categories', {
    title: {
      type: Sequelize.STRING(100),
      validate: {
        len: {
          args: [0, 100],
          msg: 'Category Title length must be less than equal to 100 characters',
        },
      },
    },
    category_type: {
      type: Sequelize.STRING(20),
      validate: {
        len: {
          args: [0, 20],
          msg: 'Category Type length must be less than equal to 20 characters',
        },
      },
    },
    description: {
      type: Sequelize.STRING(200),
      validate: {
        len: {
          args: [0, 200],
          msg: 'Category Description length must be less than equal to 200 characters',
        },
      },
    },
    image_path: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    banner_image: {
      type: Sequelize.STRING(200),
      allowNull: true,
      validate: {
        len: {
          args: [0, 200],
          msg: 'Category BannerImage length must be less than equal to 200 characters',
        },
      },
    },
    icon_path: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    parent_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    rank: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10,
      },
    },
    created_by: {
      type: Sequelize.NUMERIC,
    },
    updated_by: {
      type: Sequelize.NUMERIC,
    },
  }, {
    indexes: [
      {
        fields: ['title'], // Add index on the title field
      },
      {
        fields: ['category_type'], // Add index on the category_type field
      },
      {
        fields: ['parent_id'], // Add index on the parent_id field
      },
    ],
  });

  return Category;
};
