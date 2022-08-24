import { uploadFile } from './pinata'
import fs from 'fs'
import 'dotenv/config'

jest.setTimeout(20000)

const PINATA_API_JWT = process.env.REACT_APP_PINATA_API_JWT as string

describe('upload()', () => {
  it('[success]', async () => {
    const stream = fs.createReadStream('./src/file/sample.jpeg')
    const res = await uploadFile('image_test', stream, PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })
})
