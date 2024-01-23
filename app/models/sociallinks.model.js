module.exports = (sequelize, Sequelize) => {
  const Social_links = sequelize.define("social_links", {
    social_name: {
      type: Sequelize.STRING(100),
    },
    social_url: {
      type: Sequelize.STRING(100),
    },
    created_by: {
      type: Sequelize.NUMERIC,
    },
    modified_by: {
      type: Sequelize.NUMERIC,
    },
  });
  return Social_links;
};
