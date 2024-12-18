const {Pool} = require('pg');

const dataBaseConfig = {
    host: "localhost",
    user: "postgres",
    password: "#SuicidSquad$694",
    port: "5432",
    database: "testbase",
}
const pool = new Pool(dataBaseConfig);
module.exports = pool;