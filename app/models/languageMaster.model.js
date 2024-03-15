module.exports = (sequelize, Sequelize) => {
    const LanguageMaster = sequelize.define('language_master', {

        language: {
            type: Sequelize.STRING(50),
            validate: {
                len: {
                    args: [3, 50],
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

    return LanguageMaster;
};
