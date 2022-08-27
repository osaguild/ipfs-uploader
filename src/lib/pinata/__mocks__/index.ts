import { Metadata } from '..'

const uploadData = async <T = FormData | string>(data: T, jwt: string) => {
  console.log('[mock]pinata.uploadData() is called.')
  console.log('[param]data:', data, 'jwt:', jwt)
  return {
    IpfsHash: 'qazwsx',
    PinSize: 1000,
    Timestamp: '2022-01-01T00:00:00.000Z',
  } as Metadata
}

export { uploadData }
