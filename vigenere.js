const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const englishFreq = [
    0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094,
    0.06966, 0.00153, 0.00772, 0.04025, 0.02406, 0.06749, 0.07507, 0.01929,
    0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978, 0.0236, 0.0015,
    0.01974, 0.00074,
];

function clean(text) {
    return text.toUpperCase().replace(/[^A-Z]/g, "");
}

function decrypt(cipher, key) {
    let result = "";
    let k = 0;

    for (let i = 0; i < cipher.length; i++) {
        const c = cipher.charCodeAt(i);

        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
            const base = c >= 97 ? 97 : 65;
            const shift = key[k % key.length];

            result += String.fromCharCode(
                ((c - base - shift + 26) % 26) + base,
            );

            k++;
        } else {
            result += cipher[i];
        }
    }

    return result;
}
function chi2(text) {
    const counts = new Array(26).fill(0);

    for (const c of text) counts[c.charCodeAt(0) - 65]++;

    const N = text.length;

    let chi = 0;

    for (let i = 0; i < 26; i++) {
        const expected = englishFreq[i] * N;
        chi += (counts[i] - expected) ** 2 / expected;
    }

    return chi;
}

function bestShift(column) {
    let best = 0;
    let bestScore = Infinity;

    for (let shift = 0; shift < 26; shift++) {
        let decrypted = "";

        for (const c of column) {
            const x = ((c.charCodeAt(0) - 65 - shift + 26) % 26) + 65;
            decrypted += String.fromCharCode(x);
        }

        const score = chi2(decrypted);

        if (score < bestScore) {
            bestScore = score;
            best = shift;
        }
    }

    return best;
}

function getCol(text, start, keyLen) {
    let col = "";

    for (let i = start; i < text.length; i += keyLen) col += text[i];

    return col;
}

function findKey(cipher, keyLen) {
    const cleanText = clean(cipher);

    let key = [];

    for (let i = 0; i < keyLen; i++) {
        const column = getCol(cleanText, i, keyLen);
        key.push(bestShift(column));
    }

    return key;
}

function keyToString(key) {
    return key.map((x) => alphabet[x]).join("");
}

function ioc(text) {
    const counts = new Array(26).fill(0);

    for (const c of text) counts[c.charCodeAt(0) - 65]++;

    const N = text.length;

    let sum = 0;

    for (const n of counts) sum += n * (n - 1);

    return sum / (N * (N - 1));
}

function guessKeyLen(cipher, maxLen = 15) {
    const text = clean(cipher);

    let bestLen = 1;
    let bestIOC = 0;

    for (let len = 1; len <= maxLen; len++) {
        let cols = Array.from({ length: len }, () => "");

        for (let i = 0; i < text.length; i++) cols[i % len] += text[i];

        const avg = cols.reduce((a, c) => a + ioc(c), 0) / len;

        if (avg > bestIOC) {
            bestIOC = avg;
            bestLen = len;
        }
    }

    return bestLen;
}

function crack(cipher) {
    const keyLen = guessKeyLen(cipher);

    console.log("estimated key length:", keyLen);

    const key = findKey(cipher, keyLen);

    console.log("key:", keyToString(key));

    const plaintext = decrypt(cipher, key);

    console.log("\nplaintext:\n");
    console.log(plaintext);
}

const vigenereCode = `Vyc Rntbwiya Ipmpfktgwv qw Ntixi RzeHbvkg zrh wmjwk gc 2004, Imxrr Nxz piu xpdpv ntfk p lqurcc Qkqbkjf ekmaeymde ivkdyixl agigtl qvvf y vewjcc hjzomteyjm. Kzgrrtw jg Pvtxetm Cjraxg ipu Kpks Jcbcg, mpm uyml ywtnfuh mpm frgar ilxvlinzmu fd pg ivvypdiwuqinwbk ngdyax xqi, ycg yiukcw, pgl pgi bxomzuv eghcx qw ycbuin wpxxvlu. Nfxem qv dyn txxgrp ih jm llqi tvwvycg vwtqidje kpkcbgxva erpihwv, kkq btaakmc hnkkgjq abma ke gil ijkcgir bw dcccw zmnrrputm hrkxeg laeybbka yzrw t lqukgcvb jtrls hn ltp, Zgbbquy fjfwz vyyi txxgrjh mw jqkf ihllnvph tvl vycxk xitvlil.Bpg tmgx ixrvya hn bjv qtkqmu zq xma akdnabkqvp ycw zmnrrpuqtkkw. Ttkp hztt-fqvwkc tiqaquc uhkcuvq dg mdgiwstg iekgkbbqgj rwtb itv kdgcugerpe qv c tfxela yfpaw, acey yh oqakkgcz bpg gjprozqlls, kqlkee p uqkatjt, hz oqzlv mw bjv eghkmtp qihzm. Dp atgbmtzlv mpm prpgtbqxv mc mpmuv "dxkab-vzkt" xfxgigtgkmu, kft lpwy gpdoqlgj y rhunqirxgo ntrktpwzm wmg rwcpx txxemtj rd nvlgiqitvl vyc lhztf rpdnvl vycb. Yczvycgfwzg, kft fqvkdyabab 2F rlxfibkfl hmgtg, tfpkikvvpxsml dp zgbopv tmahza ceb qtaqe jfpima, kj txlcincw pvkmujgqem ipu cplg nqi ngxakjfma-tomf tfxelzge rd izwevqh.T aqiegubkipk dpvbwt zl iam ajfu'h ewvivtxmg qu zrh acuqimjl kpciyrmmzkqyibwv, rrpibkcnrpar zmirpsbvo vyc pwctv tfpkikvvph. Wilfp Nxz, nwt zlhmivev, gh hnbge rwx bitxci hn ogerax bmcjgcz nwt ygh imzevgkxl "mzgcgm" abcksh tvl qtaplqwprj recuuzltla, i vimex bpck kpgg xciccma nkeb tglmcigcztg hrkxeqit. Gceii pgiqten qu emi t xmtwcrm xzqkyvhvquk; qwx kip sc qhaaa rls vwurvrxmqdg, dyzbvo jvp p fwzg icpeqavza gxxzgjccmibkfl dy i gqllv vpqnu rwtv ucew htvqvzxtw kitkmdg kwwertkxitkq. Iaqa ulziem ekk cclczgj rwtb bjv qwhe zgdyxga bqccgtjtg—rls hnbge etgcqpvjn ycvpp—ddk bpg rbjeba yym bnab yrrra qb tvnttbmfcw lbbp vycxk kpkcbgxv.Pqnckxz, bjv "Ntixi Gwdtvb" pcj ldm jmge uxmpwwk gil kcnksgtt qogyrm ivf fartaqqeya vwvvimkxzaa. Zl iam Cpzrtw Abckch, iizgerh aidg wybhcanp ptiwzvvb iamqt tfxelzge btomtqggcz Jzkkgha ikevlil ivf lqxgo dqtyqntitp jxdm "xgkpde abckgdg" wz "nfpgr" invvp qbvog-nyivpqpx rwx apqn. Mc t uwtv qtkqwwj ldmm, bjv qwhe pcj dpvml ozldk kzkkgrbauu fttk bpg pcpka zgxygwqvi Gceiia qtaplqwprjar zcfv ztaidkfp iheitu ftk nivycg tvl grpar mxkjmsxa ejvpt vpitraixza fzb chb egrp hxibdvjil wz jvjbxba. Vyc rkmivfph aidg sctg xzqraibdm ke yswzmujgcz bpgjc rhvkgilh, lpwyzlv tv mxfjjmqwp zl iam agigtl bw ovci fwlgil etzmpkgcz abcebpkla.Ke adgktwjgdg, Xmrgy Ebo qu wyg fwzg kfpg i ajfu puwcv asbiqvi zl bnlla gsswtmu. Zr wta jgtmbx i avrnax wn grpar kpkcbwhwl gusrtbqqe ycw mvvvpitqvovli ug kcgrjkqvi kft xaageat hn ncdgar tqhv uxmp kjrpb tvl uzkeeqkkkw. Iazwwxf xma knvttk ezkkgcz ivf llxomzurj iamugj, gi aia uvajkml kkq eeikg rq dgm wh kft fwav jsrvmauwsa izmutfdht ntrlraqagj gc aqavfpn. Ta tqee pl bpgic pkm bqubaxza fzqrhdmtzlv mpm yfpaw, Xmrgy pgl pgi dpfqta ngae tqmvjn vwvvzljx bw dv y shuqprli ywzev gc vpqnuptga ugugp.`;

crack(vigenereCode);
