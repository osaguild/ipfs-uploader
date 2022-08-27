import { FunctionComponent } from 'react'
import { Button } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'
import { useTokenContext } from '../../hooks/TokenContext'
import { PinataMetadata, uploadFile, uploadJson } from '../../lib/pinata'
import { FileNotSetError } from '../../errors/FileNotSetError'
import { Erc721MetadataStandard } from './erc721'
import FormData from 'form-data'
import { AxiosError } from 'axios'

interface UploadButtonProps {
  fileUploaded: (file: File, metadata: PinataMetadata) => void
  fileUploadFailed: (file: File, message: string) => void
  pinataApiJwt: string
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({ fileUploaded, fileUploadFailed, pinataApiJwt }) => {
  const { file, setFile } = useFileContext()
  const { name, description } = useTokenContext()

  const generateFormData = (_fileName: string, _file: File) => {
    const form = new FormData()
    form.append('file', _file)
    form.append('pinataOptions', '{"cidVersion": 1}')
    form.append('pinataMetadata', `{"name": "${_fileName}", "keyvalues": {"company": "Pinata"}}`)
    return form
  }

  const generateJsonData = (_name: string, _description: string, _ipfsHash: string) => {
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${_ipfsHash}`
    return {
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: _name,
        keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2',
        },
      },
      pinataContent: {
        name: _name,
        description: _description,
        image: imageUrl,
      } as Erc721MetadataStandard,
    }
  }

  const click = async () => {
    if (!file || !setFile || !name || !description) throw new FileNotSetError('')
    try {
      // upload File to Pinata
      const uploadedFile = await uploadFile(generateFormData(file.name, file), pinataApiJwt)
      fileUploaded(file, uploadedFile)

      // upload Metadata to Pinata
      const uploadedJson = await uploadJson(
        JSON.stringify(generateJsonData(name, description, uploadedFile.IpfsHash)),
        pinataApiJwt
      )
      fileUploaded(file, uploadedJson)

      // clear file
      setFile(undefined)
    } catch (e) {
      if (e instanceof FileNotSetError) {
        fileUploadFailed(file, "file isn't set")
      } else if (e instanceof AxiosError) {
        console.log(e.message)
        fileUploadFailed(file, 'pinata api call is failed')
      } else {
        fileUploadFailed(file, 'unknown error')
      }
    }
  }

  return (
    <Button
      colorScheme="teal"
      variant="solid"
      onClick={click}
      disabled={file ? false : true}
      data-testid="upload-button-button"
    >
      Upload
    </Button>
  )
}

export { UploadButton, UploadButtonProps }
