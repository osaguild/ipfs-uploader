import FormData from 'form-data'
import axios, { AxiosResponse } from 'axios'

const PINATA_API_URI = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

type Metadata = {
  IpfsHash: string
  PinSize: number
  Timestamp: string
}

const uploadFile = async (fileName: string, file: File | NodeJS.ReadableStream, jwt: string) => {
  const generateConfig = (_jwt: string) => {
    return {
      headers: {
        Authorization: `Bearer ${_jwt}`,
      },
    }
  }

  const generateData = (_fileName: string, _file: File | NodeJS.ReadableStream) => {
    const form = new FormData()
    form.append('file', _file)
    form.append('pinataOptions', '{"cidVersion": 1}')
    form.append('pinataMetadata', `{"name": "${_fileName}", "keyvalues": {"company": "Pinata"}}`)
    return form
  }

  // if http status isn't equal 200, throw AxiosError
  const res = await axios.post<Metadata, AxiosResponse<Metadata, FormData>, FormData>(
    PINATA_API_URI,
    generateData(fileName, file),
    generateConfig(jwt)
  )
  return res.data
}

export { uploadFile, Metadata }
