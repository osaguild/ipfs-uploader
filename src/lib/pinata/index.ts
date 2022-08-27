import FormData from 'form-data'
import axios, { AxiosResponse } from 'axios'

const PINATA_API_URI = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

type Metadata = {
  IpfsHash: string
  PinSize: number
  Timestamp: string
}

const uploadData = async <T = FormData | string>(data: T, jwt: string) => {
  const generateConfig = (_jwt: string) => {
    return {
      headers: {
        Authorization: `Bearer ${_jwt}`,
      },
    }
  }

  // if http status isn't equal 200, throw AxiosError
  const res = await axios.post<Metadata, AxiosResponse<Metadata, T>, T>(PINATA_API_URI, data, generateConfig(jwt))
  return res.data
}

export { uploadData, Metadata }
