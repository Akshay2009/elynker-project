module.exports = (sequelize, Sequelize) => {
  const Registration = sequelize.define("registration", {
    name: {
      type: Sequelize.STRING(50)
    },
    image_path: {
      type: Sequelize.TEXT
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
      type: Sequelize.STRING(100)
    },
    company_name: {
      type: Sequelize.STRING(100)
    },
    business_type: {
      type: Sequelize.INTEGER
    },
    business_description : {
      type: Sequelize.STRING(1000)
    },
    education: {
      type: Sequelize.STRING(200)
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
