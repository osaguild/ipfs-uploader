import { uploadFile, uploadJson } from '.'
import { generateFormData, generateJsonData } from '../../components/UploadButton/generator'
import fs from 'fs'
import 'dotenv/config'

jest.setTimeout(20000)

const PINATA_API_JWT = process.env.REACT_APP_PINATA_API_JWT as string

describe('uploadFile()', () => {
  it('[success]with sample.jpeg, not set key/value', async () => {
    const formData = generateFormData(fs.createReadStream('./data/sample.jpeg'), 'test_image.jpeg')
    const res = await uploadFile(formData, PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })

  it('[success]with sample.jpeg, set key/value', async () => {
    const formData = generateFormData(
      fs.createReadStream('./data/sample.jpeg'),
      'test_image_with_key_value.jpeg',
      'label',
      'test'
    )
    const res = await uploadFile(formData, PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })

  it('[success]with sample.mp3, not set key/value', async () => {
    const formData = generateFormData(fs.createReadStream('./data/sample.mp3'), 'test_audio.mp3')
    const res = await uploadFile(formData, PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })

  it('[success]with sample.mp3, set key/value', async () => {
    const formData = generateFormData(
      fs.createReadStream('./data/sample.mp3'),
      'test_audio_with_key_value.mp3',
      'label',
      'test'
    )
    const res = await uploadFile(formData, PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })
})

describe('uploadJson()', () => {
  it('[success]not set audio and key/value', async () => {
    const jsonData = generateJsonData(
      'test_name',
      'test_description',
      'test_image_url',
      undefined,
      'test_metadata.json'
    )
    const res = await uploadJson(JSON.stringify(jsonData), PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })

  it('[success]set audio, not set key/value', async () => {
    const jsonData = generateJsonData(
      'test_name',
      'test_description',
      'test_image_url',
      'test_audio_url',
      'test_metadata_with_audio.json'
    )
    const res = await uploadJson(JSON.stringify(jsonData), PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })

  it('[success]set audio and key/value', async () => {
    const jsonData = generateJsonData(
      'test_name',
      'test_description',
      'test_image_url',
      'test_audio_url',
      'test_metadata_with_audio_key_value.json',
      'label',
      'test'
    )
    const res = await uploadJson(JSON.stringify(jsonData), PINATA_API_JWT)
    expect(res.PinSize).toBeGreaterThan(0)
  })
})
