const axios = require('axios');
const { fetchRate } = require('../src/index');

jest.mock('axios');


describe('fetchRate', () => {
    it('fetches rate correctly', async () => {
        const data = { ask: 10 }; // Sample response data
        axios.get.mockResolvedValue({ data });

        const currencyPair = 'EUR-USD'; // Sample currency pair
        const rate = await fetchRate(currencyPair);
        console.log(rate)
        expect(rate).toEqual(data.ask);
    });

    it('handles error correctly', async () => {
        axios.get.mockRejectedValue(new Error('API Error'));

        const currencyPair = 'EUR-USD'; // Sample currency pair
        const rate = await fetchRate(currencyPair);
        console.log(rate)
        expect(rate).toBeNull();
    });
});