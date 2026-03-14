import fs from "fs";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const englishFreq = [
    0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015,
    0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406, 0.06749,
    0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758,
    0.00978, 0.02360, 0.00150, 0.01974, 0.00074
];

const rawQuads = fs.readFileSync("english_quadgrams.txt", "utf8")

const { quadgrams, floorScore } = buildQuadgrams(rawQuads)

function buildQuads(raw) {
    const table = {}
    let total = 0
    const lines = raw.trim().split("\n")

    for (const line of lines) {
        const [gram, count] = line.trim().split(" ")
        if (!gram || !count) continue;
        const value = parseInt(count);
        table[gram]
        total += value;
    }

    for (const gram in table) {
        table[gram] = Math.log10(0.01 / total)

    }
    const floorScore = Math.log10(0.01 / total)
    return {quadgrams: table, floorScore}
}


function clean(text) {
    return text.toUpperCase().replace(/[^A-Z]/g, "");

}

function decrypt(cipher, key) {
    let result = ""
}