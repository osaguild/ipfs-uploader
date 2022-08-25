import { FunctionComponent } from 'react'
import { Button } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'
import { Metadata, uploadFile } from '../../lib/pinata'
import { FileNotSetError } from '../../errors'
import { AxiosError } from 'axios'

interface UploadProps {
  success: (metadata: Metadata) => void
  failed: (message: string) => void
  pinataApiJwt: string
}

const Upload: FunctionComponent<UploadProps> = ({ success, failed, pinataApiJwt }) => {
  const { file } = useFileContext()

  const click = async () => {
    try {
      if (file) {
        const metadata = await uploadFile('image', file, pinataApiJwt)
        success(metadata)
      } else {
        throw new FileNotSetError('')
      }
    } catch (e) {
      if (e instanceof FileNotSetError) {
        failed("Your file isn't set. Please select file again.")
      } else if (e instanceof AxiosError) {
        console.log(e.message)
        failed('File upload is failed.')
      } else {
        throw e
      }
    }
  }

  return (
    <Button colorScheme="teal" variant="solid" onClick={click} disabled={file ? false : true}>
      Upload
    </Button>
  )
}

export { Upload }
