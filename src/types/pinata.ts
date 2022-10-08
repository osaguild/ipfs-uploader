interface JsonUploadData {
  pinataOptions: PinataOptions
  pinataMetadata: PinataMetadata
  pinataContent: Erc721MetadataStandard
}

interface PinataOptions {
  cidVersion: 0 | 1
}

interface PinataMetadata {
  name: string
}

interface PinataMetadataWithKeyValue extends PinataMetadata {
  name: string
  keyvalues: object
}

type UploadLog = {
  IpfsHash: string
  PinSize: number
  Timestamp: string
}

interface Erc721MetadataStandard {
  name: string
  description: string
  image: string
}

export { JsonUploadData, PinataOptions, PinataMetadata, PinataMetadataWithKeyValue, UploadLog, Erc721MetadataStandard }
