export const roundToTwoDecimalPlaces = (num: number) => {
    if (num > 1000)
        return Math.floor(num);
    else
        return Number(num.toFixed(2));
}