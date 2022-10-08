import { JsonUploadData, PinataOptions, PinataMetadata, PinataMetadataWithKeyValue } from '../../types/pinata'
import { ReadStream } from 'fs'
import FormData from 'form-data'

const pinataOptions: PinataOptions = { cidVersion: 1 }

const pinataMetadata = (name: string, key?: string, value?: string) =>
  key && value
    ? ({
        name: name,
        keyvalues: { [key]: value },
      } as PinataMetadataWithKeyValue)
    : ({
        name: name,
      } as PinataMetadata)

const generateFormData = (
  file: File | ReadStream,
  metadataName: string,
  metadataKey?: string,
  metadataValue?: string
) => {
  const form = new FormData()
  form.append('file', file)
  form.append('pinataOptions', JSON.stringify(pinataOptions))
  form.append('pinataMetadata', JSON.stringify(pinataMetadata(metadataName, metadataKey, metadataValue)))
  return form
}

const generateJsonData = (
  name: string,
  description: string,
  ipfsHashOfImage: string,
  ipfsHashOfAudio: string | undefined,
  metadataName: string,
  metadataKey?: string,
  metadataValue?: string
) => {
  const pinataContent = ipfsHashOfAudio
    ? {
        name: name,
        description: description,
        image: `https://gateway.pinata.cloud/ipfs/${ipfsHashOfImage}`,
        animation_url: `https://gateway.pinata.cloud/ipfs/${ipfsHashOfAudio}`,
      }
    : {
        name: name,
        description: description,
        image: `https://gateway.pinata.cloud/ipfs/${ipfsHashOfImage}`,
      }
  return {
    pinataOptions: pinataOptions,
    pinataMetadata: pinataMetadata(metadataName, metadataKey, metadataValue),
    pinataContent: pinataContent,
  } as JsonUploadData
}

export { generateFormData, generateJsonData }
