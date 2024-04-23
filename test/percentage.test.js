const { calculatePercentageChange } = require('../src/calculatePercentage');


describe('calculatePercentageChange', () => {
    it('calculates percentage change correctly', () => {
        const currentRate = 10;
        const lastRate = 5;
        const expectedPercentageChange = 100;

        const percentageChange = calculatePercentageChange(currentRate, lastRate);

        expect(percentageChange).toEqual(expectedPercentageChange);
    });

    it('returns 0 if lastRate is null', () => {
        const currentRate = 10;
        const lastRate = null;

        const percentageChange = calculatePercentageChange(currentRate, lastRate);

        expect(percentageChange).toEqual(0);
    });
});



