module.exports = (sequelize, Sequelize) => {
  const socialMediaMaster = sequelize.define('social_media_master', {
    media_name: {
      type: Sequelize.STRING(50),
      validate: {
        len: {
          args: [3, 50],
          msg: 'Media Name length must be between 3 to 50 characters',
        },
      },
    },
    media_image_path: {
      type: Sequelize.STRING(200),
    },
    is_active: {
      type: Sequelize.BOOLEAN,
    },
  });
  return socialMediaMaster;
};
