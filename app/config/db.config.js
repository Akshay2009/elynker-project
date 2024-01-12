module.exports = {
  HOST: "172.20.2.38",
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