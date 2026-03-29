
export function bacon(ciphertext) {

  const charFreq = {};
  for (const ch of ciphertext) {
    if (/\s/.test(ch)) continue;  
    charFreq[ch] = (charFreq[ch] || 0) + 1;
  }


  const ranked = Object.entries(charFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([ch]) => ch);

  if (ranked.length < 2) {
    throw new Error("Could not detect two distinct cipher symbols in the input.");
  }

  const [sym0, sym1] = ranked; 


  const filtered = [...ciphertext].filter(ch => ch === sym0 || ch === sym1);

  if (filtered.length % 5 !== 0) {

    filtered.splice(filtered.length - (filtered.length % 5));
  }

  if (filtered.length === 0) {
    throw new Error("No valid cipher symbols found after filtering.");
  }



  function buildTable26() {
    const table = {};
    for (let i = 0; i < 26; i++) {
      const bits = i.toString(2).padStart(5, "0");
      table[bits] = String.fromCharCode(65 + i);
    }
    return table;
  }

  function buildTable24() {
    const table = {};
    const alpha = "ABCDEFGHIKLMNOPQRSTVWXYZ";
    for (let i = 0; i < 24; i++) {
      const bits = i.toString(2).padStart(5, "0");
      table[bits] = alpha[i];
    }
    return table;
  }


  function decode(sequence, zeroSym, table) {
    let result = "";
    for (let i = 0; i + 4 < sequence.length; i += 5) {
      const quintet = sequence.slice(i, i + 5);
      const bits = quintet.map(ch => (ch === zeroSym ? "0" : "1")).join("");
      result += table[bits] ?? "?";
    }
    return result;
  }



  const EN_FREQ = {
    E: 12.70, T: 9.06, A: 8.17, O: 7.51, I: 6.97, N: 6.75,
    S: 6.33,  H: 6.09, R: 5.99, D: 4.25, L: 4.03, C: 2.78,
    U: 2.76,  M: 2.41, W: 2.36, F: 2.23, G: 2.02, Y: 1.97,
    P: 1.93,  B: 1.49, V: 0.98, K: 0.77, J: 0.15, X: 0.15,
    Q: 0.10,  Z: 0.07
  };

  function score(text) {
    const upper = text.toUpperCase();
    const total = upper.replace(/[^A-Z]/g, "").length || 1;
    let s = 0;
    for (const ch of upper) {
      if (EN_FREQ[ch]) s += EN_FREQ[ch];
    }


    const unknownRatio = (text.split("?").length - 1) / text.length;
    return (s / total) - unknownRatio * 50;
  }



  const tables = [buildTable26(), buildTable24()];
  const orientations = [
    { zero: sym0, label: `${sym0}=0, ${sym1}=1` },
    { zero: sym1, label: `${sym1}=0, ${sym0}=1` }
  ];

  let best = { text: "", sc: -Infinity };

  for (const tbl of tables) {
    for (const ori of orientations) {
      const candidate = decode(filtered, ori.zero, tbl);
      const sc = score(candidate);
      if (sc > best.sc) {
        best = { text: candidate, sc };
      }
    }
  }



  return best.text
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

const example =
  "abaaa aabab aabbb aabaa aabbb aaaaa aaabb aaaaa abbaa babba baaba aabbb abaaa abbaa aabba aaaba abbab abbaa aabab abaaa aaabb aabaa abbaa baaba abaaa aaaaa ababa baaba abbab baaab aaaaa babba aabbb aabaa babaa baaaa abbab baaba aabaa abaaa baaba abaaa abbaa aaaba abaaa abbba aabbb aabaa baaaa baaba aabbb aaaaa baaba abaaa baaab aaaab babba baaab abbab aaaba aabbb aaaaa abbaa aabba abaaa abbaa aabba baaba aabbb aabaa abbab baaaa aaabb aabaa baaaa abbab aabab baaba aabbb aabaa ababa aabaa baaba baaba aabaa baaaa baaab abbab aabab baaba aabbb aabaa aaaaa ababa abbba aabbb aaaaa aaaab aabaa baaba baaba aabbb aaaaa baaba abbaa abbab baaba aaaaa babaa abbab baaaa aaabb aaaba abbab baabb ababa aaabb aaaab aabaa ababb aaaaa aaabb aabaa abbab baabb baaba";

console.log("Input   :", example);
console.log("Decoded :", bacon(example));


const numeric =
  "00101 01011 00100 00100 " +
  "00000 10011 " +
  "01110 01101 00010 00100";

console.log("\nInput   :", numeric);
console.log("Decoded :", bacon(numeric));