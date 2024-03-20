module.exports = (sequelize, Sequelize) => {
    const AdminModules = sequelize.define('admin_modules', {

        name: {
            type: Sequelize.STRING(50),
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'name must be less than 50 characters',
                },
            },
        },
        description: {
            type: Sequelize.STRING(500),
            validate: {
                len: {
                    args: [0, 500],
                    msg: 'Description must be less than 500 characters',
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

    return AdminModules;
};
