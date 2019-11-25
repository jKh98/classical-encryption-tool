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

