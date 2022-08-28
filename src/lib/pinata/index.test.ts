import { uploadFile, uploadJson } from '.'
import { JsonUploadData } from '../../types/pinata'
import fs from 'fs'
import FormData from 'form-data'
import 'dotenv/config'

jest.setTimeout(20000)

const PINATA_API_JWT = process.env.REACT_APP_PINATA_API_JWT as string

describe('uploadFile()', () => {
  it('[success]', async () => {
    const form = new FormData()
    form.append('file', fs.createReadStream('./data/sample.jpeg'))
    form.append('pinataOptions', '{"cidVersion": 1}')
    form.append('pinataMetadata', `{"name": "image_test", "keyvalues": {"company": "Pinata"}}`)
    const res = await uploadFile(form, PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })
})

describe('uploadJson()', () => {
  it('[success]', async () => {
    const data: JsonUploadData = {
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: 'test_image',
        keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2',
        },
      },
      pinataContent: {
        name: 'test name',
        description: 'test description',
        image: 'image_url',
      },
    }
    const res = await uploadJson(JSON.stringify(data), PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })
})
