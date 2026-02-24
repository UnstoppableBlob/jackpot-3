

const frequencies = [
    0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 
    0.00772, 0.04025, 0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056,
    0.02758, 0.00978, 0.02360, 0.00150, 0.01974, 0.00074
];

const bigrams = [
    'th', 'he', 'in', 'er', 'an', 're', 'nd', 'at', 'on', 'nt', 'ha', 'es', 'st', 'en', 'ed', 
    'to', 'it', 'ou', 'ea', 'hi', 'is', 'or', 'ti', 'as', 'te', 'et', 'ng', 'of', 'al', 'de'
];


function keyLength(code, maxLen = 15) {
    let bestLen = 1
    let bestIOC = 0

    for (let guess = 2; guess <= maxLen; guess++) {
        let columns = new Array(guess).fill('');

        for (let i = 0; i <code.length; i++) {
            columns[i % guess] += code[i];

        }

        let total = 0
        
        for (let col = 0; col < guess; col++) {
            total += ioc(columns[col]);
        }
        let average = totalIOC / guess;

        if (average > bestIOC) {
            bestIOC = averageIOC;
            bestLen = guess;
        }
    }

    return bestLen;

}


const ioc = (text) => {
    total = text.length
    if (total === 0) return 0;

    let counts = new Array(26).fill(0);
    for (let i = 0; i < total; i++) {
        counts[text.charCodeAt(i) - 97]++
    }

    let sum = 0;
    for (let i = 0; i < 26; i++) {
        sum += counts[i] * (counts[i] - 1);
    }
    return sum / (total * (total - 1));
}


function chiSquared(text) {
    const letters = text.toLowerCase().replace(/[^a-z]/g, '');
    const total = letters.length;
    if (total === 0) return Infinity;

    let counts = new Array(26).fill(0);
    for (let i = 0; i < total; i++) {
        counts[letters.charCodeAt(i) - 97]++;
    }

    let chi2 = 0;
    for(let i = 0; i < 26; i++) {
        const expected = total * frequencies[i];
        if (expected > 0) {
            chi2 += Math.pow(counts[i] - expected, 2) / expected;
        }
    }
    return chi2;
}

function bigramScore(text) {
    let score = 0;
    const letters = text.toLowerCase().replace(/[^a-z]/g, '');
    
    for (let i = 0; i < letters.length - 1; i++) {
        const bigram = letters.substring(i, i + 2);
        if (bigrams.includes(bigram)) score++;
    }
    return score;
}

function decrypt(code, type) {
    if (type === 'caesar') {
        let candidates = [];

        for (let i = 0; i < 26; i++) {
            let decrypted = shift(code, i);
            const score = chiSquared(decrypted);
            candidates.push({ text: decrypted, score: score });
        }

        candidates.sort((a, b) => a.score - b.score);

        let best = candidates[0].text;
        let bestBigram = -1;

        for (let i = 0; i < 5; i++) {
            let text = candidates[i].text;
            let bgScore = bigramScore(text);
            
            if (bgScore > bestBigram) {
                bestBigram = bgScore;
                best = text;
            }
        }
        
        return best;
    }
}

const shift = (characters, amount) => {
    const n = amount % 26;
    return [...characters].map((char) => {
        const c = char.charCodeAt(0);
        if (c >= 65 && c <= 90) return String.fromCharCode(((c - 65 + n) % 26) + 65);
        if (c >= 97 && c <= 122) return String.fromCharCode(((c - 97 + n) % 26) + 97);  
        return char;
    }).join('');
}

console.log(decrypt('olssv dvysk tf uhtl pz altwshal', 'caesar')); 
console.log(decrypt('Uifsf jt b tfdsfu dpef', 'caesar'));