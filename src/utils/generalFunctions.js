export const getFrequency = (string) => {
    let alpha = {
        'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0,
        'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0,
        's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0
    };
    let stringLength = 0;
    for (let i = 0; i < string.length; i++) {
        let character = string.charAt(i);
        if (character.toString().toLowerCase().match(/[a-z]/i)) {
            alpha[character.toString().toLowerCase()] = Number(alpha[character.toString().toLowerCase()]) + 1;
            stringLength++;
        }
    }
    let freq = [];
    let i = 0;
    for (const [, value] of Object.entries(alpha)) {
        freq[i] = Math.round(Number(value * 100 / stringLength) * 100) / 100;
        i++;
    }
    console.log(freq);
    return freq;
};

export const checkIfBinary = (string) => {
    let bin = ['0', '1', ' '];
    for (let i = 0; i < string.length; i++) {
        if (!bin.includes(string[i])) {
            return false;
        }
    }
    return true;
};
export const checkIfHex = (string) => {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f', ' '];
    for (let i = 0; i < string.length; i++) {
        if (!hex.includes(string[i])) {
            return false;
        }
    }
    return true;
};