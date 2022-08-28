import { FunctionComponent } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { FileSelector } from '../FileSelector'
import { FileImage } from '../FileImage'
import { TokenForm } from '../TokenForm'
import { UploadButton } from '../UploadButton'
import { FileContext, useFileProvider } from '../../hooks/FileContext'
import { TokenContext, useTokenProvider } from '../../hooks/TokenContext'
import { Event, FileSelectedEvent, UploadedEvent, UploadFailedEvent } from '../../types/event'
import { PinataMetadata, JsonUploadData } from '../../types/pinata'
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

  const fileUploaded = (data: File | JsonUploadData, metadata: PinataMetadata) => {
    const event: UploadedEvent = {
      eventType: 'UPLOADED',
      data,
      metadata,
    }
    callback(event)
  }

  const fileUploadFailed = (message: string) => {
    const event: UploadFailedEvent = {
      eventType: 'UPLOAD_FAILED',
      message,
    }
    callback(event)
  }

  return (
    <ChakraProvider>
      <FileContext.Provider value={useFileProvider()}>
        <FileSelector fileSelected={fileSelected} />
        <TokenContext.Provider value={useTokenProvider()}>
          <TokenForm />
          <UploadButton fileUploaded={fileUploaded} fileUploadFailed={fileUploadFailed} pinataApiJwt={pinataApiJwt} />
        </TokenContext.Provider>
        <FileImage />
      </FileContext.Provider>
    </ChakraProvider>
  )
}

export { IpfsUploader, IpfsUploaderProps }
