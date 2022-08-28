import { uploadFile, uploadJson } from '.'
import { generateFormData, generateJsonData } from '../../components/UploadButton/generator'
import fs from 'fs'
import 'dotenv/config'

jest.setTimeout(20000)

const PINATA_API_JWT = process.env.REACT_APP_PINATA_API_JWT as string

describe('uploadFile()', () => {
  it('[success]not set key value', async () => {
    const formData = generateFormData(fs.createReadStream('./package.json'), 'image_test')
    const res = await uploadFile(formData, PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })

  it('[success]set key value', async () => {
    const formData = generateFormData(fs.createReadStream('./package.json'), 'image_test', 'label', 'test')
    const res = await uploadFile(formData, PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })
})

describe('uploadJson()', () => {
  it('[success]not set key value', async () => {
    const jsonData = generateJsonData('test name', 'test description', 'image_url', 'test_image')
    const res = await uploadJson(JSON.stringify(jsonData), PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })

  it('[success]set key value', async () => {
    const jsonData = generateJsonData('test name', 'test description', 'image_url', 'test_image', 'label', 'test')
    const res = await uploadJson(JSON.stringify(jsonData), PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })
})
