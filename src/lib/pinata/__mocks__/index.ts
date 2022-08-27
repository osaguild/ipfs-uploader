import { PinataMetadata } from '..'

const uploadFile = async (file: FormData, jwt: string) => {
  console.log('[mock]pinata.uploadFile() is called.')
  console.log('[param]file:', file, 'jwt:', jwt)
  return {
    IpfsHash: 'qazwsx',
    PinSize: 1000,
    Timestamp: '2022-01-01T00:00:00.000Z',
  } as PinataMetadata
}

const uploadJson = async (stringifiedJson: string, jwt: string) => {
  console.log('[mock]pinata.uploadJson() is called.')
  console.log('[param]stringifiedJson:', stringifiedJson, 'jwt:', jwt)
  return {
    IpfsHash: 'edcrfv',
    PinSize: 2000,
    Timestamp: '2022-02-01T00:00:00.000Z',
  } as PinataMetadata
}

export { uploadFile, uploadJson, PinataMetadata }
