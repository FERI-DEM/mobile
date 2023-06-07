export function roundToNearest15Minutes(date: Date) {
    const minutes = date.getMinutes();
    const remainder = minutes % 15;
    if (remainder !== 0) {
        date.setMinutes(minutes + (15 - remainder));
    }
    return date;
}