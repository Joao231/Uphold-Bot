const { Pool } = require('pg');

let poolConfig;

// Check if the application is running in Docker
if (process.env.RUNNING_IN_DOCKER === 'true') {
    // Use Docker-specific host configuration
    poolConfig = {
        user: '',
        host: '', // Use the Docker container name as the host
        database: '',
        password: '',
        port: 5432,
    };
} else {
    // Use local host configuration
    poolConfig = {
        user: '',
        host: '',
        database: '',
        password: '',
        port: 5432,
    };
}

// Create a PostgreSQL client pool with the configured options
const pool = new Pool(poolConfig);

module.exports = pool;
