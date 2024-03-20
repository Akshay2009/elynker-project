module.exports = (sequelize, Sequelize) => {
    const ModuleDetail = sequelize.define('module_details', {
        admin_module_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        value: {
            type: Sequelize.STRING(50),
            len: {
                args: [0, 50],
                msg: 'name must be less than 50 characters',
            },
        },
        status: {
            type: Sequelize.BOOLEAN,
        },
        created_by: {
            type: Sequelize.NUMERIC,
        },
        updated_by: {
            type: Sequelize.NUMERIC,
        },
    });
    return ModuleDetail;
};