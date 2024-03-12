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
  }, {
    indexes: [
      {
        fields: ['socialmedia_id'], // Add index on the socialmedia_id field
      },
      {
        fields: ['social_name'], // Add index on the social_name field
      },
    ],
  });
  return socialLinks;
};
