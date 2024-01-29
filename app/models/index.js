const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.registration = require('../models/registration.model.js')(sequelize, Sequelize);
db.product = require('../models/product.model.js')(sequelize, Sequelize);
db.cityMaster = require('../models/cityMaster.js')(sequelize, Sequelize);
db.stateMaster = require('../models/stateMaster.js')(sequelize, Sequelize);
db.currencyMaster = require('../models/currencyMaster.js')(sequelize, Sequelize);
db.registrationTypesMaster= require('../models/registrationTypesMaster.js')(sequelize, Sequelize);
db.businessDetail= require('../models/business_detail.model.js')(sequelize, Sequelize);
db.category = require('../models/category.model.js')(sequelize,Sequelize);
db.certificate=require('../models/certificate.js')(sequelize,Sequelize);
db.sociallinks=require('../models/sociallinks.model.js')(sequelize,Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];
//associate user and registration as 1:1
db.user.hasOne(db.registration);
db.registration.belongsTo(db.user);

//associate registration and document as 1:1
db.registration.hasMany(db.businessDetail);
db.businessDetail.belongsTo(db.registration);

//associate registration and product as 1:1 with foreign key on product model
db.registration.hasOne(db.product);
db.product.belongsTo(db.registration);

//associate certificate with registration as 1:1 foreign key on certificate
db.registration.hasOne(db.certificate);
db.certificate.belongsTo(db.registration);

//associate sociallinks associated with registration as 1:1 foreign key on certificate
db.registration.hasOne(db.sociallinks);
db.sociallinks.belongsTo(db.registration);

//associate Product and Category as m:m
db.product.belongsToMany(db.category, {
  through: "product_category"
});
db.category.belongsToMany(db.product, {
  through: "product_category"
});

module.exports = db;
