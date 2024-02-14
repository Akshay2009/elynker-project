module.exports = (sequelize, Sequelize) => {
  const FreelancerResume = sequelize.define("freelancer_resume", {
    freelancer_resume: {
      type: Sequelize.STRING(300),
    },
  });
  return FreelancerResume;
};
