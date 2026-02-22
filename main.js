

const decrypt = (code, type) => {
    if (type === 'caesar') {
        for (let i = 0; i < 26; i++) {
            console.log(shift(code, i));
        }
    }
}

const shift = (characters, amount) => {
    const n = amount % 26

    return [...characters].map((char) => {
        const c = char.charCodeAt(0);

        if (c >= 65 && c <= 90) {
            return String.fromCharCode(((c - 65 +n) %26) + 65);
        }

        if (c  >= 97 && c <= 122) {
            return String.fromCharCode(((c -97 + n) % 26) + 97);
        }  

        return char;

    })
    .join('')
}

console.log("test")
// console.log(shift('hello world', 5))
console.log(decrypt('Khoor zruog', 'caesar'))