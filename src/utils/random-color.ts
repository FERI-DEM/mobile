export const getColor = (index: number) => {
    console.log(index % colors.length)
    return colors[index % colors.length];
}

export const colors = [
    "#E63946",
    "#457B9D",
    "#FF9F1C",
    "#6D6875",
    "#C5DCA0",
    "#F2CC8F",
    "#8C9EFF",
    "#1D3557",
    '#FF3E4D',
    '#00C49A',
    '#FF8C3B',
    '#8DC63F',
    '#00D8FF',
    '#FFCA29',
    '#3F51B5',
    '#8561C5',
    '#E91E63',
    '#03A9F4',
    '#009688',
    '#00BCD4',
    '#8BC34A',
];
