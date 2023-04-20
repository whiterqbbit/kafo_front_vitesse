const fs = require('node:fs')
const CryptoJS = require('crypto-js')
const dotenv = require('dotenv')

dotenv.config()

const key = CryptoJS.enc.Utf8.parse(process.env.VITE_ENCRYPTION_KEY)
const encrypted_path = 'src/utils/encrypted-db.dat'
const decrypted_path = 'src/utils/db.json'

function encryptJSONFile() {
  const data = fs.readFileSync(decrypted_path, 'utf8')
  const encryptedData = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()

  fs.writeFileSync(encrypted_path, encryptedData)
}

function decryptJSONFile() {
  try {
    const encryptedData = fs.readFileSync(encrypted_path, 'utf8')
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })

    const data = decryptedData.toString(CryptoJS.enc.Utf8)

    fs.writeFileSync(decrypted_path, data)
  } catch (err) {
    console.error('Error decrypting data:', err)
  }
}

module.exports = {
  encryptJSONFile,
  decryptJSONFile,
}
