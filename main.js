import {franc} from 'franc'


const frequencies = [
    0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 
    0.00772, 0.04025, 0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056,
    0.02758, 0.00978, 0.02360, 0.00150, 0.01974, 0.00074
];


function chiSquared(text) {
    const letters = text.toLowerCase().replace(/[^a-z]/g, '')
    const totalLetters = letters.length;

    if (totalLetters === 0) return Infinity;

    let counts = new Array(26).fill(0)

    for (let i = 0; i < 26; i++) {
        const charCode = letters.charCodeAt(i) - 97
        counts[charCode]++
    }

    let chi2 = 0;
    for(let i = 0; i < 26; i++) {
        const observed = counts[i]
        const expected = totalLetters * frequencies[i]

        if (expected > 0) {
            chi2 += Math.pow(observed - expected, 2) / expected
        }

    }
    return chi2
}


// const decrypt = (code, type) => {
//     if (type === 'caesar') {
//         for (let i = 0; i < 26; i++) {
//             let decrypted = shift(code, i)
//             // console.log(decrypted);
//             if (franc(decrypted) === 'eng') {
//                 return decrypted
//             }
//         }     
//     }
// }


const decrypt = (code, type) => {
    if (type ==='caesar') {
        let bestDecryption = '';
        let lowestScore = Infinity;

        for (let i = 0; i < 26; i++) {
            let decrypted = shift(code, i)
            let score = chiSquared(decrypted)

            if (score <lowestScore) {
                lowestScore = score
                bestDecryption = decrypted
            }
        }
        return bestDecryption; 
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
// console.log(decrypt('Khoor zruog', 'caesar'))
console.log(decrypt('olssv dvysk tf uhtl pz altwshal', 'caesar'))