import { uploadData } from '.'
import fs from 'fs'
import FormData from 'form-data'
import 'dotenv/config'

jest.setTimeout(20000)

const PINATA_API_JWT = process.env.REACT_APP_PINATA_API_JWT as string

describe('upload()', () => {
  it('[success]', async () => {
    const form = new FormData()
    form.append('file', fs.createReadStream('./data/sample.jpeg'))
    form.append('pinataOptions', '{"cidVersion": 1}')
    form.append('pinataMetadata', `{"name": "image_test", "keyvalues": {"company": "Pinata"}}`)
    const res = await uploadData(form, PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })
})
