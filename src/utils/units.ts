export const convertFromBaseUnit = (value: number, baseUnit: string) => {
    const units = [baseUnit, 'k' + baseUnit, 'M' + baseUnit, 'G' + baseUnit, 'T' + baseUnit];
    const calculatedUnitIndex = Math.floor(Math.log(value) / Math.log(1000))
    const calculatedValue = Math.round(value / Math.pow(1000, calculatedUnitIndex + 1) * 1000)
    return calculatedValue + units[calculatedUnitIndex]
}