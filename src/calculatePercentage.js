function calculatePercentageChange(currentRate, lastRate) {
    if (!lastRate) return 0;
    return ((currentRate - lastRate) / lastRate) * 100;
}

module.exports = {
    calculatePercentageChange
};