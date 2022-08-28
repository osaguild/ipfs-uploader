type JsonUploadData = {
  pinataOptions: {
    cidVersion: 1
  }
  pinataMetadata: {
    name: string
    keyvalues: {
      customKey: string
      customKey2: string
    }
  }
  pinataContent: Erc721MetadataStandard
}

type PinataMetadata = {
  IpfsHash: string
  PinSize: number
  Timestamp: string
}

interface Erc721MetadataStandard {
  name: string
  description: string
  image: string
}

export { JsonUploadData, PinataMetadata, Erc721MetadataStandard }
