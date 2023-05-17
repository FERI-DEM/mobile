export const roundToTwoDecimalPlaces = (num: number) => {
    if (num > 1000)
        return Math.floor(num);
    else
        return Number(num.toFixed(2));
}

export const calculatePowerPercentageDifference = (firstNumber: number, secondNumber: number) => {
    const difference = firstNumber - secondNumber;
    const percentageDifference = (difference / firstNumber) * 100;
    if (percentageDifference >= 50)
        return Math.trunc(percentageDifference);
    return null;
};