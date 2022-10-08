import { FunctionComponent } from 'react'
import { Button } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'
import { useTokenContext } from '../../hooks/TokenContext'
import { uploadFile, uploadJson } from '../../lib/pinata'
import { ValidationError } from '../../errors'
import { JsonUploadData, UploadLog } from '../../types/pinata'
import { generateFormData, generateJsonData } from './generator'
import { AxiosError } from 'axios'

interface UploadButtonProps {
  fileUploaded: (data: JsonUploadData | File, log: UploadLog) => void
  fileUploadFailed: (message: string) => void
  pinataApiJwt: string
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({ fileUploaded, fileUploadFailed, pinataApiJwt }) => {
  const { file, fileName, setFile } = useFileContext()
  const { name, description, metadataName, metadataKey, metadataValue } = useTokenContext()

  const click = async () => {
    // validation
    if (!file || !fileName || !setFile) throw new ValidationError('File not set')
    else if (!name) throw new ValidationError('name is not set')
    else if (!description) throw new ValidationError('description is not set')

    try {
      // upload File to Pinata
      const formData = generateFormData(file, fileName, metadataKey, metadataValue)
      const uploadFileLog = await uploadFile(formData, pinataApiJwt)
      fileUploaded(file, uploadFileLog)

      // upload Metadata to Pinata
      const jsonData = generateJsonData(
        name,
        description,
        uploadFileLog.IpfsHash,
        metadataName ? metadataName : name,
        metadataKey,
        metadataValue
      )
      const uploadJsonLog = await uploadJson(JSON.stringify(jsonData), pinataApiJwt)
      fileUploaded(jsonData, uploadJsonLog)

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
      width="100"
      data-testid="upload-button-button"
    >
      Upload
    </Button>
  )
}

export { UploadButton, UploadButtonProps }
