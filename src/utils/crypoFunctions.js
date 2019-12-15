
const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

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
    plaintext = plaintext.toLowerCase();
    let extras = {};
    for (let i = 0; i < plaintext.length; i++) {
        if (plaintext[i].match(/[^a-z]/g)) {
            extras[i] = plaintext[i];
        }
    }
    plaintext = plaintext.replace(/[^a-z]/g, "");
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
    for (let i in extras) {
        ciphertext = [ciphertext.slice(0, i), extras[i], ciphertext.slice(i)].join('')
    }
    return ciphertext;
};

export const playfairDecrypt = (keysquare, ciphertext) => {
    let plaintext = "";
    let extras = [];
    ciphertext = ciphertext.toLowerCase();
    for (let i = 0; i < ciphertext.length; i++) {
        if (ciphertext[i].match(/[^a-z]/g)) {
            extras[i] = ciphertext[i];
        }
    }
    ciphertext = ciphertext.replace(/[^a-z]/g, "");
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
    for (let i in extras) {
        plaintext = [plaintext.slice(0, i), extras[i], plaintext.slice(i)].join('')
    }
    return plaintext;
};

export const playfairMatrix = (key) => {
    let grid = [];
    if (key) {
        // create grid from key
        const sanitizedKey = key.toLowerCase().replace('j', 'i').replace(/[^a-z]/g, '');
        grid = [...new Set(`${sanitizedKey}${'abcdefghiklmnopqrstuvwxyz'}`)];
    } else {
        grid = alpha.filter((item)=> item!=='j')
    }
    return grid.toString().replace(/,/g, '');
};

export const hillEncrypt = (keys, plaintext) => {
    keys = keys.split(" ");
    plaintext = plaintext.toLowerCase();
    let extras = {};
    for (let i = 0; i < plaintext.length; i++) {
        if (plaintext[i].match(/[^a-z]/g)) {
            extras[i] = plaintext[i];
        }
    }
    plaintext = plaintext.replace(/[^a-z]/g, "");
    // do some error checking
    if (plaintext.length % 2 === 1) {
        plaintext = plaintext + "x";
    }
    for (let i = 0; i < 4; i++) keys[i] = keys[i] % 26;
    let ciphertext = "";
    for (let i = 0; i < plaintext.length; i += 2) {
        ciphertext += String.fromCharCode((keys[0] * (plaintext.charCodeAt(i) - 97) + keys[1] * (plaintext.charCodeAt(i + 1) - 97)) % 26 + 97);
        ciphertext += String.fromCharCode((keys[2] * (plaintext.charCodeAt(i) - 97) + keys[3] * (plaintext.charCodeAt(i + 1) - 97)) % 26 + 97);
    }

    for (let i in extras) {
        ciphertext = [ciphertext.slice(0, i), extras[i], ciphertext.slice(i)].join('')
    }
    return ciphertext;
};

export const hillDecrypt = (keys, ciphertext) => {
    keys = keys.split(" ");
    let extras = [];
    ciphertext = ciphertext.toLowerCase();
    for (let i = 0; i < ciphertext.length; i++) {
        if (ciphertext[i].match(/[^a-z]/g)) {
            extras[i] = ciphertext[i];
        }
    }
    ciphertext = ciphertext.replace(/[^a-z]/g, "");
    for (let i = 0; i < 4; i++) keys[i] = keys[i] % 26;
    let ikeys = inverseKeyMatrix(keys);
    for (let i = 0; i < 4; i++) {
        if (ikeys[i] < 0) ikeys[i] += 26;
    }
    let plaintext = "";
    for (let i = 0; i < ciphertext.length; i += 2) {
        plaintext += String.fromCharCode((ikeys[0] * (ciphertext.charCodeAt(i) - 97) + ikeys[1] * (ciphertext.charCodeAt(i + 1) - 97)) % 26 + 97);
        plaintext += String.fromCharCode((ikeys[2] * (ciphertext.charCodeAt(i) - 97) + ikeys[3] * (ciphertext.charCodeAt(i + 1) - 97)) % 26 + 97);
    }
    for (let i in extras) {
        plaintext = [plaintext.slice(0, i), extras[i], plaintext.slice(i)].join('')
    }
    return plaintext;
};

export const inverseKeyMatrix = (keys) => {
    // calc inv matrix
    let det = keys[0] * keys[3] - keys[1] * keys[2];
    det = ((det % 26) + 26) % 26;
    let di = 0;
    for (let i = 0; i < 26; i++) {
        if ((det * i) % 26 === 1) di = i;
    }
    if (di === 0) {
        return [];
    }
    let ikeys = new Array(4);
    ikeys[0] = (di * keys[3]) % 26;
    ikeys[1] = (-1 * di * keys[1]) % 26;
    ikeys[2] = (-1 * di * keys[2]) % 26;
    ikeys[3] = di * keys[0];
    return ikeys;
};

