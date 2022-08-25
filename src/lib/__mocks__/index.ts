import { Metadata } from '../pinata'

const uploadFile = async (fileName: string, file: File | NodeJS.ReadableStream, jwt: string) => {
  return {
    IpfsHash: 'qazwsx',
    PinSize: 1000,
    Timestamp: '2022-01-01T00:00:00.000Z',
  } as Metadata
}

export { uploadFile }
