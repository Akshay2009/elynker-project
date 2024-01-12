module.exports = (sequelize, Sequelize) => {
  const Registration = sequelize.define("registration", {
    id: {
      type: Sequelize.NUMERIC,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.NUMERIC
    },
    name: {
      type: Sequelize.STRING(50)
    },
    image_path: {
      type: Sequelize.STRING(200)
    },
    isActive: {
      type: Sequelize.BOOLEAN
    },
    ip_address: {
      type: Sequelize.STRING(20)
    },
    registration_type: {
      type: Sequelize.INTEGER
    },
    dob: {
      type: Sequelize.DATE
    },
    latitude: {
      type: Sequelize.STRING(20)
    },
    longitude: {
      type: Sequelize.STRING(20)
    },
    registration_status: {
      type: Sequelize.INTEGER
    },
    registration_steps_completed: {
      type: Sequelize.INTEGER
    },
    city: {
      type: Sequelize.STRING(50)
    },    
    address1: {
      type: Sequelize.STRING(100)
    },
    address2: {
      type: Sequelize.STRING(100)
    },
    state: {
      type: Sequelize.STRING(50)
    },
    country: {
      type: Sequelize.INTEGER
    },
    company_name: {
      type: Sequelize.INTEGER
    },
    business_description : {
      type: Sequelize.INTEGER
    },
    education: {
      type: Sequelize.INTEGER
    },
    available_hrs_per_week: {
      type: Sequelize.INTEGER
    },
    hourly_rate: {
      type: Sequelize.NUMERIC(9,2)
    },
    service_fee: {
      type: Sequelize.NUMERIC(9,2)
    },
    currency_id: {
      type: Sequelize.INTEGER
    },
    created_by: {
      type: Sequelize.NUMERIC
    },
    updated_by: {
      type: Sequelize.NUMERIC
    }
  });

  return Registration;
};
