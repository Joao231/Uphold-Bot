const axios = require('axios');
const yargs = require('yargs');
const { storeAlert } = require('./db/alerts.js');
const { calculatePercentageChange } = require('./calculatePercentage');
require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL;

let lastRates = {};

async function fetchRate(currencyPair) {
    try {
        const response = await axios.get(API_BASE_URL + currencyPair);
        return response.data.ask; // Assuming ask price is what we want
    } catch (error) {
        console.error(`Error fetching rate for ${currencyPair}:`, error);
        return null;
    }
}


async function checkPriceOscillation(currencyPair, oscillationPercentage) {
    const currentRate = await fetchRate(currencyPair);
    if (currentRate !== null) {
        const lastRate = lastRates[currencyPair];
        const percentageChange = calculatePercentageChange(currentRate, lastRate);
        if (Math.abs(percentageChange) >= oscillationPercentage) {
            console.log(`Price oscillation detected for ${currencyPair} at current rate: ${currentRate} -> percentage: ${percentageChange.toFixed(4)}% change`);
            lastRates[currencyPair] = currentRate;
            await storeAlert(currencyPair, currentRate, lastRate, Math.abs(percentageChange), { oscillationPercentage });
        }
        else {
            if (!lastRate) {
                lastRates[currencyPair] = currentRate;
            }
            console.log(`No price oscillation for ${currencyPair} at current rate: ${currentRate}`);
        }
    }
}

function startMonitoring(currencyPairs, fetchInterval, oscillationPercentage) {
    setInterval(async () => {
        for (const currencyPair of currencyPairs) {
            await checkPriceOscillation(currencyPair, oscillationPercentage);
        }
    }, fetchInterval * 1000);
}

// Check if the module is being run directly
if (require.main === module) {
    // Command-line arguments
    const args = yargs(process.argv.slice(2))
        .usage('Usage: $0 [options]')
        .option('pairs', {
            alias: 'p',
            describe: 'Currency pairs to monitor (comma-separated)',
            demandOption: true,
            type: 'string'
        })
        .option('interval', {
            alias: 'i',
            describe: 'Fetch interval in seconds',
            demandOption: true,
            type: 'number'
        })
        .option('percentage', {
            alias: 'perc',
            describe: 'Price oscillation percentage threshold',
            demandOption: true,
            type: 'number'
        })
        .argv;

    const currencyPairs = args.pairs.split(',');
    const fetchInterval = args.interval;
    const oscillationPercentage = args.percentage;

    startMonitoring(currencyPairs, fetchInterval, oscillationPercentage);
}

module.exports = {
    fetchRate,
    calculatePercentageChange,
    checkPriceOscillation
};