const pool = require('./dbConfig');

async function storeAlert(currencyPair, rate, lastRate, percentage, configuration) {
    try {
        const query = {
            text: 'INSERT INTO alerts(currency_pair, rate, last_rate, percentage, configuration) VALUES($1, $2, $3, $4, $5)',
            values: [currencyPair, rate, lastRate, percentage, configuration],
        };
        await pool.query(query);
    } catch (error) {
        console.error('Error storing alert:', error);
    }
}

module.exports = { storeAlert };