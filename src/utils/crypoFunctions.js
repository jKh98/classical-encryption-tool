const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const alphaUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const affineEncrypt = (a, b, text) => {
    a = parseInt(a);
    b = parseInt(b);
    for (let i = 0; i < text.length; i++) {
        let alphaIndex = (text[i] === text[i].toUpperCase()) ? alphaUpper.indexOf(text[i]) : alpha.indexOf(text[i]);
        let newIndex = (a * alphaIndex + b) % alpha.length;
        let s = text[i].match(/[a-z]/i) ? ((text[i] === text[i].toUpperCase()) ? alphaUpper[newIndex] : alpha[newIndex]) : text[i];
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
        let alphaIndex = (text[i] === text[i].toUpperCase()) ? alphaUpper.indexOf(text[i]) : alpha.indexOf(text[i]);
        let newIndex = (invert * (alphaIndex - b)) % alpha.length;
        if (newIndex < 0)
            newIndex += alpha.length;
        let s = text[i].match(/[a-z]/i) ? ((text[i] === text[i].toUpperCase()) ? alphaUpper[newIndex] : alpha[newIndex]) : text[i];
        text = text.toString().substring(0, i) + s + text.toString().substring(i + 1);
    }
    return text;
};
