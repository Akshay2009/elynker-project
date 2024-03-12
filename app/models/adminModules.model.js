module.exports = (sequelize, Sequelize) => {
    const AdminModules = sequelize.define('admin_modules', {

        name: {
            type: Sequelize.STRING(50),
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'name must be less than 50 characters',
                },
            },
        },
        description: {
            type: Sequelize.STRING(500),
            validate: {
                len: {
                    args: [10, 500],
                    msg: 'Description must be less than 500 characters',
                },
            },
        },
        is_active: {
            type: Sequelize.BOOLEAN,
        },
    });

    return AdminModules;
};
