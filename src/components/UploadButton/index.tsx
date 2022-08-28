import { FunctionComponent } from 'react'
import { Button } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'
import { useTokenContext } from '../../hooks/TokenContext'
import { uploadFile, uploadJson } from '../../lib/pinata'
import { ValidationError } from '../../errors'
import { JsonUploadData, PinataMetadata } from '../../types/pinata'
import FormData from 'form-data'
import { AxiosError } from 'axios'

interface UploadButtonProps {
  fileUploaded: (data: JsonUploadData | File, metadata: PinataMetadata) => void
  fileUploadFailed: (message: string) => void
  pinataApiJwt: string
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({ fileUploaded, fileUploadFailed, pinataApiJwt }) => {
  const { file, fileName, setFile } = useFileContext()
  const { name, description } = useTokenContext()

  const generateFormData = (_fileName: string, _file: File) => {
    const form = new FormData()
    form.append('file', _file)
    form.append('pinataOptions', '{"cidVersion": 1}')
    form.append('pinataMetadata', `{"name": "${_fileName}", "keyvalues": {"company": "Pinata"}}`)
    return form
  }

  const generateJsonData = (_name: string, _description: string, _ipfsHash: string) => {
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
        image: `https://gateway.pinata.cloud/ipfs/${_ipfsHash}`,
      },
    } as JsonUploadData
  }

  const click = async () => {
    // validation
    if (!file || !fileName || !setFile) throw new ValidationError('File not set')
    else if (!name) throw new ValidationError('name is not set')
    else if (!description) throw new ValidationError('description is not set')

    try {
      // upload File to Pinata
      const uploadedFile = await uploadFile(generateFormData(fileName, file), pinataApiJwt)
      fileUploaded(file, uploadedFile)

      // upload Metadata to Pinata
      const jsonData = generateJsonData(name, description, uploadedFile.IpfsHash)
      const uploadedJson = await uploadJson(JSON.stringify(jsonData), pinataApiJwt)
      fileUploaded(jsonData, uploadedJson)

      // clear file
      setFile(undefined)
    } catch (e) {
      console.log(e)
      if (e instanceof ValidationError) {
        fileUploadFailed(e.message)
      } else if (e instanceof AxiosError) {
        fileUploadFailed('pinata api call is failed')
      } else {
        fileUploadFailed('unknown error')
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
