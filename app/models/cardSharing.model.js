module.exports = (sequelize, Sequelize) => {
  const CardSharing = sequelize.define("card_sharing", {
    image_url: {
      type: Sequelize.STRING(500),
    },
    image: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    posted_by: {
      type: Sequelize.NUMERIC,
    },
  });

  return CardSharing;
};
