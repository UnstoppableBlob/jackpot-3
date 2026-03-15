import fs from "fs"


const rawQuads = fs.readFileSync("english_quadgrams.txt","utf8")
const { quadgrams, floorScore } = buildQuads(rawQuads)

function buildQuads(raw){

    const table = {}
    let total = 0

    const lines = raw.trim().split("\n")

    for(const line of lines){

        const [gram,count] = line.split(" ")

        const value = parseInt(count)

        table[gram] = value
        total += value
    }

    for(const gram in table){
        table[gram] = Math.log10(table[gram] / total)
    }

    const floorScore = Math.log10(0.01 / total)

    return { quadgrams: table, floorScore }
}



function quadScore(text){

    const clean = text.toUpperCase().replace(/[^A-Z]/g,"")

    let score = 0

    for(let i=0;i<clean.length-3;i++){

        const gram = clean.substring(i,i+4)

        if(quadgrams[gram])
            score += quadgrams[gram]
        else
            score += floorScore
    }

    return score
}


function decrypt(cipher,key){

    let result = ""
    let k = 0

    for(let i=0;i<cipher.length;i++){

        const c = cipher.charCodeAt(i)

        if((c>=65 && c<=90)||(c>=97 && c<=122)){

            const base = c>=97 ? 97 : 65
            const shift = key[k % key.length]

            result += String.fromCharCode(
                ((c-base-shift+26)%26)+base
            )

            k++

        }else{
            result += cipher[i]
        }
    }

    return result
}


function crack(cipher,keyLen,iterations=500){

    let key = Array.from({length:keyLen},()=>Math.floor(Math.random()*26))

    let bestText = decrypt(cipher,key)
    let bestScore = quadScore(bestText)

    for(let i=0;i<iterations;i++){

        let newKey = [...key]

        const pos = Math.floor(Math.random()*keyLen)
        newKey[pos] = (newKey[pos] + (Math.random()<0.5 ? 1 : -1) + 26) % 26

        const text = decrypt(cipher,newKey)
        const score = quadScore(text)

        if(score > bestScore){

            bestScore = score
            bestText = text
            key = newKey
        }
    }

    return {key,text:bestText,score:bestScore}
}


function crackRestart(cipher,keyLen,restarts=10){

    let best = null

    for(let i=0;i<restarts;i++){

        const result = crack(cipher,keyLen)

        if(!best || result.score > best.score)
            best = result
    }

    return best
}


function ioc(text){

    const clean = text.toLowerCase().replace(/[^a-z]/g,"")

    const counts = new Array(26).fill(0)

    for(const c of clean)
        counts[c.charCodeAt(0)-97]++

    let sum = 0
    const N = clean.length

    for(const n of counts)
        sum += n*(n-1)

    return sum/(N*(N-1))
}


function guessKeyLen(cipher,maxLen=15){

    const clean = cipher.toLowerCase().replace(/[^a-z]/g,"")

    let bestLen = 1
    let bestIOC = 0

    for(let len=2;len<=maxLen;len++){

        const cols = Array.from({length:len},()=>"")

        for(let i=0;i<clean.length;i++)
            cols[i%len]+=clean[i]

        const avg = cols.reduce((a,c)=>a+ioc(c),0)/len

        if(avg > bestIOC){

            bestIOC = avg
            bestLen = len
        }
    }

    return bestLen
} 


function solveVigenere(cipher){
    let best = null

    for (let len=2; len <= 12; len++) {
        console.log("Testing key length:", len)
    
        const result = crackRestart(cipher, len, 150)

        if (!best || result.score > best.score)
            best = result
    }

    console.log("\nBest Result")
    // console.log("Key:", keyToString(best.key))
    console.log("\nPlaintext:\n")
    console.log(best.text)

}


solveVigenere(
"Altd wl h zwkpjg dzbt vsetyhxeb, vowgofpr gu ii wzbz hvv xsr psgs n lprrpfiyqfd. rmb zljvtn e qtbzlzhbmlb etuuz use xomamj dlmcys, gvtji t'x ilpvy k zgowysek jmassk. P lgx'x ivgh vbc ssyr hapa lobr qk, mig o altyy ba azyyjl tp zbtn iyzizo"
)
