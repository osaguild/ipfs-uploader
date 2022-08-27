import FormData from 'form-data'
import axios, { AxiosResponse } from 'axios'

const PINATA_API_URI = 'https://api.pinata.cloud/pinning/'

type PinataMetadata = {
  IpfsHash: string
  PinSize: number
  Timestamp: string
}

const uploadFile = async (file: FormData, jwt: string) => {
  console.log('upload file is called')
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }

  // if http status isn't equal 200, throw AxiosError
  const res = await axios.post<PinataMetadata, AxiosResponse<PinataMetadata, FormData>, FormData>(
    PINATA_API_URI + 'pinFileToIPFS',
    file,
    config
  )
  return res.data
}

const uploadJson = async (stringifiedJson: string, jwt: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  }

  // if http status isn't equal 200, throw AxiosError
  const res = await axios.post<PinataMetadata, AxiosResponse<PinataMetadata, string>, string>(
    PINATA_API_URI + 'pinJSONToIPFS',
    stringifiedJson,
    config
  )
  return res.data
}

export { uploadFile, uploadJson, PinataMetadata }
