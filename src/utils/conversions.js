
export const text2Binary = (string) => {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
};

export const binary2Text = (string) => {
    return string.split(' ').map(function(elem) {
        return String.fromCharCode(parseInt(elem, 2));
    }).join('')

};

export const hex2Binary = (string) => {
    return string.split(' ').map(function(elem) {
        return (parseInt(elem, 16).toString(2)).padStart(8, '0');
    }).join(' ')
};

export const binary2Hex = (string) => {
    return string.split(' ').map(function(elem) {
        return (parseInt(elem, 2).toString(16));
    }).join(' ')
};

export const text2Hex = (string) => {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(16);
    }).join(' ');
};

export const hex2Text = (string) => {
    return string.split(' ').map(function(elem) {
        return String.fromCharCode(parseInt(elem, 16));
    }).join('')

};
