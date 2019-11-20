export const text2Binary = (string) => {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
};

export const binary2Text = (string) => {
    return string.split(' ').map(function (elem) {
        return String.fromCharCode(parseInt(elem, 2));
    }).join('')

};

export const hex2Binary = (string) => {
    return string.split(' ').map(function (elem) {
        return (parseInt(elem, 16).toString(2)).padStart(8, '0');
    }).join(' ')
};

export const binary2Hex = (string) => {
    return string.split(' ').map(function (elem) {
        return (parseInt(elem, 2).toString(16));
    }).join(' ')
};

export const text2Hex = (string) => {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(16);
    }).join(' ');
};

export const hex2Text = (string) => {
    return string.split(' ').map(function (elem) {
        return String.fromCharCode(parseInt(elem, 16));
    }).join('')

};

export const convert2Text = (value, mode) => {
    switch (mode) {
        case ("Binary"):
            return binary2Text(value);
        case ("Hexadecimal"):
            return hex2Text(value);
        case ("Text"):
        default:
            return value;
    }
};

export const convertFromText = (value, mode) => {
    switch (mode) {
        case ("Binary"):
            return text2Binary(value);
        case ("Hexadecimal"):
            return text2Hex(value);
        case ('Text'):
        default:
            return value;
    }
};

export const convert = (text, oldMode, newMode) => {
    let s;
    switch (newMode) {
        case 'Binary':
            if (oldMode === 'Text')
                s = text2Binary(text);
            else if (oldMode === 'Hexadecimal')
                s = hex2Binary(text);
            break;
        case 'Hexadecimal':
            if (oldMode === 'Text')
                s = text2Hex(text);
            else if (oldMode === 'Binary')
                s = binary2Hex(text);
            break;
        case 'Text':
        default:
            if (oldMode === 'Binary')
                s = binary2Text(text);
            else if (oldMode === 'Hexadecimal')
                s = hex2Text(text);
            break;
    }
    return s;
};