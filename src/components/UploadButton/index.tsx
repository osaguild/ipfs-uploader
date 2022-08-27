import { FunctionComponent } from 'react'
import { Button } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'
import { Metadata, uploadData } from '../../lib/pinata'
import { FileNotSetError } from '../../errors/FileNotSetError'
import { AxiosError } from 'axios'

interface UploadButtonProps {
  fileUploaded: (file: File, metadata: Metadata) => void
  fileUploadFailed: (file: File, message: string) => void
  pinataApiJwt: string
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({ fileUploaded, fileUploadFailed, pinataApiJwt }) => {
  const { file, setFile } = useFileContext()

  const generateFormData = (_fileName: string, _file: File) => {
    const form = new FormData()
    form.append('file', _file)
    form.append('pinataOptions', '{"cidVersion": 1}')
    form.append('pinataMetadata', `{"name": "${_fileName}", "keyvalues": {"company": "Pinata"}}`)
    return form
  }

  const click = async () => {
    if (!file || !setFile) throw new FileNotSetError('')
    const formData = generateFormData(file.name, file)
    try {
      const metadata = await uploadData(formData, pinataApiJwt)
      fileUploaded(file, metadata)
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
      data-testid="upload-button"
    >
      Upload
    </Button>
  )
}

export { UploadButton, UploadButtonProps }
