import { useState } from 'react'
import { caesar } from './caesar.js'
import { vigenere } from './vigenere.js'
import { bacon } from './baconian.js'
import './App.css'



function App() {
  // console.log("is it defined", decrypt)
  const [type, setType] = useState('caesar')
  const [ ciphertext, setCiphertext ] = useState('')
  const [ plaintext, setPlaintext ] = useState('')

  const updateCipher = (e) => {
    const el = e.target
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
    setCiphertext(el.value)
}

  const handleChange = (e) => {
    const newVal = e.target.value
    setType(newVal)

    console.log(`selected ${newVal}`)
    console.log(newVal)
  }

  const decode = (event) => {
    event.preventDefault();
    if (type === "caesar") {
      setPlaintext(caesar(ciphertext))
    } else if (type === "vigenere") {
      setPlaintext(vigenere(ciphertext))
    } else if (type === "bacon") {
      setPlaintext(bacon(ciphertext))
    }
    


  }

  return (
  <>
    <div className="container">
      <div className="header">
        <span className="tag">&lt;decrypt&gt;</span>
        <h1>Cracker</h1>
        <span className="tag">&lt;/decrypt&gt;</span>
      </div>
      <p className="subtitle">Enter your ciphertext and select a cipher type</p>

      <form onSubmit={decode} className="form">
        <div className="field">
          <label htmlFor="ciphertext" className="label">Ciphertext</label>
          <input id="ciphertext" type="text" placeholder="Uifsf jt b tfdsfu dpef..." onChange={updateCipher} className="input" />
        </div>

        <div className="field">
          <label htmlFor="ciphertype" className="label">Cipher Type</label>
          <select id="ciphertype" name="ciphertype" value={type} onChange={handleChange} className="select" >


            <option value="caesar">Caesar Cipher</option>
            <option value="vigenere">Vigenère Cipher</option>
            <option value="bacon">Baconian Cipher</option>
          </select>
        </div>


        <button type="submit" className="button">
          <span className="btn-text">Decode</span>
          <span className="btn-arrow">→</span>
        </button>

      </form>

      {plaintext && (
        <div className="output">
          <span className="output-label">// plaintext</span>
          <p className="output-text">{plaintext}</p>
        </div>

      )}
    </div>

  </>
)
}

export default App
