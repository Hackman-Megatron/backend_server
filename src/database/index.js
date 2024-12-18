const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "#SuicidSquad$694",
    port: "5435",
    database: "testbase",
})

module.exports = {
    query: (text, params) => pool.query(text, params),
};
