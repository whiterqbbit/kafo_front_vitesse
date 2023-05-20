import fs from 'node:fs'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import CryptoJS from 'crypto-js'

dotenv.config()

async function write_places_db() {
  const xano_url = `${process.env.VITE_XANO_API_URL}/api:EW8LvnML/place`
  const response = await fetch(xano_url)
  const data = await response.json()

  const key = process.env.VITE_ENCRYPTION_KEY || ''
  const encrypted_db = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()

  fs.writeFileSync('./src/utils/conversions.json', `${JSON.stringify(encrypted_db)}\n`)
}

write_places_db()
