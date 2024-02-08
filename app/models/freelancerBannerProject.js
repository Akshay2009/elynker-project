module.exports = (sequelize, Sequelize) => {
    const FreelancerBannerProject = sequelize.define("freelancer_banner_projects", {
        banner_name: {
            type: Sequelize.STRING(100),
            validate: {
                len: {
                    args: [0, 100],
                    msg: "Banner Name length must be less than equal to 100 characters",
                },
            },
        },
        banner_image: {
            type: Sequelize.STRING,
        },
        created_by: {
            type: Sequelize.NUMERIC
        },
        updated_by: {
            type: Sequelize.NUMERIC
        },
    });

    return FreelancerBannerProject;
};
  