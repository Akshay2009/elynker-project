module.exports = (sequelize, Sequelize) => {
  const Widgets = sequelize.define("widgets", {
    widget_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    page_name: {
      type: Sequelize.STRING(50),
    },
    is_active: {
      type: Sequelize.BOOLEAN,
    },
    rank: {
      type: Sequelize.NUMERIC,
      validate: {
        min: 1,
      },
    },
    updated_by: {
      type: Sequelize.NUMERIC,
    },
  });

  return Widgets;
};
