module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Esoft1234",
  DB: "elynker",
  dialect: "postgres",
  pool: {
    
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
