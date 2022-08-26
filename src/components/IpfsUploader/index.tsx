import { FunctionComponent } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { FileSelector } from '../FileSelector'
import { FileImage } from '../FileImage'
import { UploadButton } from '../UploadButton'
import { FileContext, useFileProvider } from '../../hooks/FileContext'
import { Event, FileSelectedEvent, FileUploadedEvent, FileUploadFailedEvent } from './event'
import { Metadata } from '../../lib/pinata'

interface IpfsUploaderProps {
  pinataApiJwt: string
  callback: (event: Event) => void
}

const IpfsUploader: FunctionComponent<IpfsUploaderProps> = ({ pinataApiJwt, callback }) => {
  const fileSelected = (file: File) => {
    const event: FileSelectedEvent = {
      eventType: 'FILE_SELECTED',
      file,
    }
    callback(event)
  }

  const fileUploaded = (file: File, metadata: Metadata) => {
    const event: FileUploadedEvent = {
      eventType: 'FILE_UPLOADED',
      file,
      metadata,
    }
    callback(event)
  }

  const fileUploadFailed = (file: File, message: string) => {
    const event: FileUploadFailedEvent = {
      eventType: 'FILE_UPLOAD_FAILED',
      file,
      message,
    }
    callback(event)
  }

  return (
    <ChakraProvider>
      <FileContext.Provider value={useFileProvider()}>
        <FileSelector fileSelected={fileSelected} />
        <UploadButton fileUploaded={fileUploaded} fileUploadFailed={fileUploadFailed} pinataApiJwt={pinataApiJwt} />
        <FileImage />
      </FileContext.Provider>
    </ChakraProvider>
  )
}

export { IpfsUploader, IpfsUploaderProps }
