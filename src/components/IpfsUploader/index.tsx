import { FunctionComponent } from 'react'
import { ChakraProvider, Stack } from '@chakra-ui/react'
import { FileSelector } from '../FileSelector'
import { FileImage, Size } from '../FileImage'
import { TokenForm } from '../TokenForm'
import { UploadButton } from '../UploadButton'
import { FileContext, useFileProvider } from '../../hooks/FileContext'
import { TokenContext, useTokenProvider } from '../../hooks/TokenContext'
import { Event, FileSelectedEvent, UploadedEvent, UploadFailedEvent } from '../../types/event'
import { UploadLog, JsonUploadData } from '../../types/pinata'

interface IpfsUploaderProps {
  pinataApiJwt: string
  callback: (event: Event) => void
  enableMetadata: boolean
  enableChangeName: boolean
  imageSize: Size
}

const IpfsUploader: FunctionComponent<IpfsUploaderProps> = ({
  pinataApiJwt,
  callback,
  enableMetadata,
  enableChangeName,
  imageSize,
}) => {
  const fileSelected = (file: File) => {
    const event: FileSelectedEvent = {
      eventType: 'FILE_SELECTED',
      file,
    }
    callback(event)
  }

  const fileUploaded = (data: File | JsonUploadData, log: UploadLog) => {
    const event: UploadedEvent = {
      eventType: 'UPLOADED',
      data,
      log,
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
        <TokenContext.Provider value={useTokenProvider()}>
          <TokenForm enableMetadataName={enableMetadata} enableKeyValue={enableMetadata} />
          <FileImage enableChangeName={enableChangeName} imageSize={imageSize} />
          <Stack spacing="2" direction="row" justify="center" mt="2">
            <FileSelector fileSelected={fileSelected} />
            <UploadButton fileUploaded={fileUploaded} fileUploadFailed={fileUploadFailed} pinataApiJwt={pinataApiJwt} />
          </Stack>
        </TokenContext.Provider>
      </FileContext.Provider>
    </ChakraProvider>
  )
}

export { IpfsUploader, IpfsUploaderProps }
