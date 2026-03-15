import { useState } from 'react'
import { decrypt } from './caesar.js'


function App() {
  // console.log("is it defined", decrypt)
  const [type, setType] = useState('caesar')
  const [ ciphertext, setCiphertext ] = useState('')
  const [ plaintext, setPlaintext ] = useState('')

  const updateCipher = (e) => {
    const newVal = e.target.value
    setCiphertext(newVal)

  }

  const handleChange = (e) => {
    const newVal = e.target.value
    setType(newVal)

    console.log(`selected ${newVal}`)
    console.log(newVal)
  }

  const decode = (event) => {
    event.preventDefault();

    setPlaintext(decrypt(ciphertext))

    

  }

  return (
    <>
      <div>
        <h1>Cracker</h1>
        <h3>Enter your ciphertext and type of cipher</h3>
        <form onSubmit={decode}>
          <label htmlFor='ciphertext'>Ciphertext: </label>
          <input type='text' placeholder='Uifsf jt b tfdsfu dpef' onChange={updateCipher}></input>
          <label htmlFor="ciphertype">Choose a cipher: </label>
          <select id='ciphertype' name="ciphertype" value={type} onChange={handleChange}>
            <option value="caesar">Caesar Cipher</option>
            <option value="vigenere">Vigenere Cipher</option>
          </select>
          <button type='submit'>Decode</button>
        </form>
        
        <h4>{plaintext}hello</h4>

      </div>
    </>
  )
}

export default App
