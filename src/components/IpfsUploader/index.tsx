import { FunctionComponent } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { FileSelector } from '../FileSelector'
import { FileImage } from '../FileImage'
import { UploadButton } from '../UploadButton'
import { FileContext, useFileProvider } from '../../hooks/FileContext'
import { Event, FileSelectedEvent } from './event'

interface IpfsUploaderProps {
  pinataApiJwt: string
  callback: (event: Event) => void
}

const IpfsUploader: FunctionComponent<IpfsUploaderProps> = ({ pinataApiJwt, callback }) => {
  const fileSelected = (file: File) => {
    const event: FileSelectedEvent = {
      eventType: 'FILE_SELECTED',
      file,
      message: 'File is selected',
    }
    callback(event)
  }

  return (
    <ChakraProvider>
      <FileContext.Provider value={useFileProvider()}>
        <FileSelector fileSelected={fileSelected} />
        <FileImage />
        <UploadButton
          success={(metadata) => console.log('success', metadata)}
          failed={(message) => console.log('failed', message)}
          pinataApiJwt={pinataApiJwt}
        />
      </FileContext.Provider>
    </ChakraProvider>
  )
}

export { IpfsUploader, IpfsUploaderProps }
