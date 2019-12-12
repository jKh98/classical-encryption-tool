//import 'mathjs';

const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// const alphaUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const affineEncrypt = (a, b, text) => {
    a = parseInt(a);
    b = parseInt(b);
    for (let i = 0; i < text.length; i++) {
        let alphaIndex = (text[i] === text[i].toUpperCase()) ? alpha.indexOf(text[i].toLowerCase()) : alpha.indexOf(text[i]);
        let newIndex = (a * alphaIndex + b) % alpha.length;
        let s = text[i].match(/[a-z]/i) ? ((text[i] === text[i].toUpperCase()) ? alpha[newIndex].toUpperCase() : alpha[newIndex]) : text[i];
        text = text.toString().substring(0, i) + s + text.toString().substring(i + 1);
    }
    return text;
};

export const affineDecrypt = (a, b, text) => {
    a = parseInt(a);
    b = parseInt(b);
    for (let i = 0; i < text.length; i++) {
        a %= alpha.length;
        let invert;
        for (let j = 1; j < alpha.length; j++) {
            if ((a * j) % alpha.length === 1)
                invert = j;
        }
        let alphaIndex = (text[i] === text[i].toUpperCase()) ? alpha.indexOf(text[i].toLowerCase()) : alpha.indexOf(text[i]);
        let newIndex = (invert * (alphaIndex - b)) % alpha.length;
        if (newIndex < 0)
            newIndex += alpha.length;
        let s = text[i].match(/[a-z]/i) ? ((text[i] === text[i].toUpperCase()) ? alpha[newIndex].toUpperCase() : alpha[newIndex]) : text[i];
        text = text.toString().substring(0, i) + s + text.toString().substring(i + 1);
    }
    return text;
};

export const monoAlphabeticEncrypt = (key, text) => {
    for (let i = 0; i < text.length; i++) {
        let alphaIndex = (text[i] === text[i].toUpperCase()) ? alpha.indexOf(text[i].toLowerCase()) : alpha.indexOf(text[i]);
        let s = text[i].match(/[a-z]/i) ? ((text[i] === text[i].toUpperCase()) ? (key[alphaIndex]).toUpperCase() : key[alphaIndex]) : text[i];
        text = text.toString().substring(0, i) + s + text.toString().substring(i + 1);
    }
    return text;
};

export const monoAlphabeticDecrypt = (key, text) => {
    for (let i = 0; i < text.length; i++) {
        let alphaIndex = (text[i] === text[i].toUpperCase()) ? key.indexOf(text[i].toLowerCase()) : key.indexOf(text[i]);
        let s = text[i].match(/[a-z]/i) ? ((text[i] === text[i].toUpperCase()) ? (alpha[alphaIndex]).toUpperCase() : alpha[alphaIndex]) : text[i];
        text = text.toString().substring(0, i) + s + text.toString().substring(i + 1);
    }
    return text;
};

export const vigenereEncrypt = (keyword, text) => {
    let temp = "";
    let word = text.replace(/\W/g, '')
    for (let i = 0; i < word.length; i++) {
        let upper = word[i] === word[i].toUpperCase();
        let s = alpha[(alpha.indexOf(upper ? word[i].toLowerCase() : word[i]) + alpha.indexOf(keyword[i % keyword.length])) % alpha.length];
        s = upper ? s.toUpperCase() : s;
        temp += s;
    }
    let encrypt = '';
    for (let i = 0, j = 0; i < text.length && j < temp.length; i++) {
        if (text[i].match(/[a-z]/i)) {
            encrypt += temp[j];
            j++;
        } else {
            encrypt += text[i];
        }
    }
    return encrypt;
};

export const vigenereDecrypt = (keyword, text) => {
    let temp = "";
    let word = text.replace(/\W/g, '')
    for (let i = 0; i < word.length; i++) {
        let upper = word[i] === word[i].toUpperCase();
        let s = alpha[((alpha.indexOf(upper ? word[i].toLowerCase() : word[i]) + alpha.length) - alpha.indexOf(keyword[i % keyword.length])) % alpha.length];
        s = upper ? s.toUpperCase() : s;
        temp += s;
    }
    let decrypt = '';
    for (let i = 0, j = 0; i < text.length && j < temp.length; i++) {
        if (text[i].match(/[a-z]/i)) {
            decrypt += temp[j];
            j++;
        } else {
            decrypt += text[i];
        }
    }
    return decrypt;
};


export const playfairEncrypt = (keysquare, plaintext) => {
    while (plaintext.length % 2 !== 0) plaintext += "x";
    let ciphertext = "";
    let a, b, c, d;
    for (let i = 0; i < plaintext.length; i += 2) {
        a = plaintext.charAt(i);
        b = plaintext.charAt(i + 1);
        if (a === b) b = "x";
        let row1 = parseInt(keysquare.indexOf(a) / 5);
        let col1 = keysquare.indexOf(a) % 5;
        let row2 = parseInt(keysquare.indexOf(b) / 5);
        let col2 = keysquare.indexOf(b) % 5;
        if (row1 === row2) {
            if (col1 === 4) c = keysquare.charAt(row1 * 5);
            else c = keysquare.charAt(row1 * 5 + col1 + 1);
            if (col2 === 4) d = keysquare.charAt(row2 * 5);
            else d = keysquare.charAt(row2 * 5 + col2 + 1);
        } else if (col1 === col2) {
            if (row1 === 4) c = keysquare.charAt(col1);
            else c = keysquare.charAt((row1 + 1) * 5 + col1);
            if (row2 === 4) d = keysquare.charAt(col2);
            else d = keysquare.charAt((row2 + 1) * 5 + col2);
        } else {
            c = keysquare.charAt(row1 * 5 + col2);
            d = keysquare.charAt(row2 * 5 + col1);
        }

        ciphertext += c + d;
    }
    return ciphertext;
};

export const playfairDecrypt = (keysquare, ciphertext) => {
    let plaintext = "";
    for (let i = 0; i < ciphertext.length; i += 2) {
        let a, b, c, d;
        a = ciphertext.charAt(i);
        b = ciphertext.charAt(i + 1);
        let row1 = parseInt(keysquare.indexOf(a) / 5);
        let col1 = keysquare.indexOf(a) % 5;
        let row2 = parseInt(keysquare.indexOf(b) / 5);
        let col2 = keysquare.indexOf(b) % 5;
        if (row1 === row2) {
            if (col1 === 0) c = keysquare.charAt(row1 * 5 + 4);
            else c = keysquare.charAt(row1 * 5 + col1 - 1);
            if (col2 === 0) d = keysquare.charAt(row2 * 5 + 4);
            else d = keysquare.charAt(row2 * 5 + col2 - 1);
        } else if (col1 === col2) {
            if (row1 === 0) c = keysquare.charAt(20 + col1);
            else c = keysquare.charAt((row1 - 1) * 5 + col1);
            if (row2 === 0) d = keysquare.charAt(20 + col2);
            else d = keysquare.charAt((row2 - 1) * 5 + col2);
        } else {
            c = keysquare.charAt(row1 * 5 + col2);
            d = keysquare.charAt(row2 * 5 + col1);
        }
        plaintext += c + d;
    }
    return plaintext;
};

//export const playfairEncrypt = (keyword, text) => {};

//export const playfairDecrypt = (keyword, text) => {};