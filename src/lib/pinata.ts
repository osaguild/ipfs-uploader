import { globalConfig } from '../config'
import FormData from 'form-data'
import axios, { AxiosResponse } from 'axios'

const PINATA_API_URI = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

type Metadata = {
  IpfsHash: string
  PinSize: number
  Timestamp: string
}

const uploadFile = async (fileName: string, file: File | NodeJS.ReadableStream) => {
  const generateConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${globalConfig().REACT_APP_PINATA_API_JWT}`,
      },
    }
  }

  const generateData = (fileName: string, file: File | NodeJS.ReadableStream) => {
    const form = new FormData()
    form.append('file', file)
    form.append('pinataOptions', '{"cidVersion": 1}')
    form.append('pinataMetadata', `{"name": "${fileName}", "keyvalues": {"company": "Pinata"}}`)
    return form
  }

  // if http status isn't equal 200, throw AxiosError
  const res = await axios.post<Metadata, AxiosResponse<Metadata, FormData>, FormData>(
    PINATA_API_URI,
    generateData(fileName, file),
    generateConfig()
  )
  return res.data
}

export { uploadFile, Metadata }
