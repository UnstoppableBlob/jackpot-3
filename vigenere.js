const fs = require("fs")
const rawQuadgrams = fs.readFileSync("english_quadgrams.txt", "utf8")
const {quadgrams, floorScore} = buildQuad(rawQuadgrams)

function buildQuad(raw) {
    const table = []
    let total = 0

    for (const line of raw.trim().split("\n")){

        table[gram] = parseInt(count)
        total += table[gram]
    }

    for (const gram in table) {
        table[gram] = Math.log10(table[gram] / total)


    }

    return table
}
