module.exports = (sequelize, Sequelize) => {
    const EducationMaster = sequelize.define('education_master', {

        education: {
            type: Sequelize.STRING(50),
            validate: {
                len: {
                    args: [1, 50],
                    msg: 'name must be less than 50 characters',
                },
            },
        },
        is_active: {
            type: Sequelize.BOOLEAN,
        },
        created_by: {
            type: Sequelize.NUMERIC,
        },
        updated_by: {
            type: Sequelize.NUMERIC,
        },
    });

    return EducationMaster;
};
