const axios = require('axios');
const { checkPriceOscillation } = require('../src/index');
const { calculatePercentageChange } = require('../src/calculatePercentage');
const { storeAlert } = require('../src/db/alerts.js');


jest.mock('../src/calculatePercentage', () => {
    return {
        calculatePercentageChange: jest.fn()
    };
  });

jest.mock('../src/db/alerts.js', () => ({
    storeAlert: jest.fn()
}))

jest.mock('axios');


describe('checkPriceOscillation', () => {
    
    it('detects price oscillation and stores alert', async () => {
        const currencyPair = 'BTC-USD'; // Sample currency pair
        const oscillationPercentage = 0.01;
        const currentRate = 66849.4580236702;

        // Mock axios response
        const axiosResponse = {
            data: { ask: currentRate }
        };
        axios.get.mockResolvedValue(axiosResponse);

        calculatePercentageChange.mockReturnValue(0.014244830181628428);

        // Call the function under test
        await checkPriceOscillation(currencyPair, oscillationPercentage);

        // Assertion
        expect(storeAlert).toHaveBeenCalled();

    });

});