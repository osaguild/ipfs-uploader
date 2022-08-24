import { uploadFile } from './pinata'
import fs from 'fs'

jest.setTimeout(20000)

describe('upload()', () => {
  it('[success]', async () => {
    const stream = fs.createReadStream('./src/file/sample.jpeg')
    const res = await uploadFile('image_test', stream)
    expect(res.PinSize).toBeGreaterThan(0)
  })
})
