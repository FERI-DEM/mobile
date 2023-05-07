import {charWidth, fontSize, fontWidth} from "./config";

const digitParts = [
    [fontWidth, fontWidth / 2, charWidth - fontWidth, fontWidth / 2], //spodaj
    [charWidth - fontWidth, fontWidth, charWidth - fontWidth, fontSize - fontWidth / 2], //spodaj desno
    [charWidth - fontWidth, fontSize, fontWidth, fontSize], //sredina
    [fontWidth, fontSize - fontWidth / 2, fontWidth, fontWidth], //spodaj levo
    [charWidth - fontWidth, fontSize + fontWidth / 2, charWidth - fontWidth, 2 * fontSize - fontWidth], //zgoraj desno
    [fontWidth, fontSize + fontWidth / 2, fontWidth, 2 * fontSize - fontWidth], //zgoraj levo
    [fontWidth, 2 * fontSize - fontWidth / 2, charWidth - fontWidth, 2 * fontSize - fontWidth / 2], //zgoraj
]

export const chars = new Map([
    ['0', [...digitParts[0], ...digitParts[1], ...digitParts[3], ...digitParts[4], ...digitParts[5], ...digitParts[6]]],
    ['1', [...digitParts[1], ...digitParts[4]]],
    ['2', [...digitParts[6], ...digitParts[0], ...digitParts[4], ...digitParts[3], ...digitParts[2]]],
    ['3', [...digitParts[2], ...digitParts[0], ...digitParts[6], ...digitParts[4], ...digitParts[1]]],
    ['4', [...digitParts[4], ...digitParts[5], ...digitParts[2], ...digitParts[1]]],
    ['5', [...digitParts[0], ...digitParts[6], ...digitParts[2], ...digitParts[5], ...digitParts[1]]],
    ['6', [...digitParts[0], ...digitParts[1], ...digitParts[2], ...digitParts[3], ...digitParts[5], ...digitParts[6]]],
    ['7', [...digitParts[6], ...digitParts[1], ...digitParts[4]]],
    ['8', [...digitParts[0], ...digitParts[1], ...digitParts[2], ...digitParts[3], ...digitParts[4], ...digitParts[5], ...digitParts[6]]],
    ['9', [...digitParts[0], ...digitParts[1], ...digitParts[2], ...digitParts[4], ...digitParts[5], ...digitParts[6]]],
    [':', [charWidth / 2, fontSize / 2 - 0.15, charWidth / 2, fontSize / 2 + 0.15, charWidth / 2,  2 * fontSize - fontSize / 2 - 0.15, charWidth / 2,  2 * fontSize - fontSize / 2 + 0.15]],
    ['.', [charWidth / 2, 0, charWidth / 2, 0.4]],
    ['k', [fontWidth * 1.5, 2 * fontSize - fontWidth, fontWidth * 1.5, 0, fontWidth * 1.5, fontSize * 0.6, charWidth - fontWidth, fontSize * 1.2, fontWidth * 1.5, fontSize * 0.6, charWidth - fontWidth, fontWidth / 2]],
    ['W', [fontWidth, 2 * fontSize, fontSize / 4, 0, fontSize / 4, 0, fontSize / 2, fontSize, fontSize / 2, fontSize, fontSize * 0.75, 0, fontSize * 0.75, 0, fontSize - fontWidth, 2 * fontSize ]],
    ['-', [fontWidth, fontSize, charWidth - fontWidth, fontSize]],
])
