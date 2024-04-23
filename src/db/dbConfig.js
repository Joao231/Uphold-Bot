const { Pool } = require('pg');

let poolConfig;

// Check if the application is running in Docker
if (process.env.RUNNING_IN_DOCKER === 'true') {
    // Use Docker-specific host configuration
    poolConfig = {
        user: 'postgres',
        host: 'host.docker.internal', // Use the Docker container name as the host
        database: 'Alerts',
        password: 'F1-driver!1999',
        port: 5432,
    };
} else {
    // Use local host configuration
    poolConfig = {
        user: 'postgres',
        host: 'localhost',
        database: 'Alerts',
        password: 'F1-driver!1999',
        port: 5432,
    };
}

// Create a PostgreSQL client pool with the configured options
const pool = new Pool(poolConfig);

module.exports = pool;
