module.exports = (sequelize, Sequelize) => {
  const socialLinks = sequelize.define('social_links', {
    social_name: {
      type: Sequelize.STRING(100),
    },
    social_url: {
      type: Sequelize.STRING(100),
    },
    socialmedia_id: {
      type: Sequelize.INTEGER,
    },
    created_by: {
      type: Sequelize.NUMERIC,
    },
    modified_by: {
      type: Sequelize.NUMERIC,
    },
  });
  return socialLinks;
};
