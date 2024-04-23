const pool = require('./dbConfig');

async function dbSetup() {
    try {
        pool.query(`CREATE TABLE IF NOT EXISTS alerts (
            id SERIAL PRIMARY KEY,
            currency_pair VARCHAR(10),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            rate NUMERIC,
            last_rate NUMERIC,
            percentage NUMERIC(5, 4),
            configuration JSON
        );`);
    } catch (error) {
        console.error(`Error to setup PostgreSQL DB:`, error);
        return null;
    }
}

dbSetup();