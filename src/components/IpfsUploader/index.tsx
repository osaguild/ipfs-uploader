import { FunctionComponent, useState } from 'react'
import { ChakraProvider, Stack } from '@chakra-ui/react'
import { ImageSelector } from '../ImageSelector'
import { ImageView } from '../ImageView'
import { AudioSelector } from '../AudioSelector'
import { AudioView } from '../AudioView'
import { TokenForm } from '../TokenForm'
import { UploadButton } from '../UploadButton'
import { ImageContext, useImageProvider } from '../../hooks/ImageContext'
import { AudioContext, useAudioProvider } from '../../hooks/AudioContext'
import { TokenContext, useTokenProvider } from '../../hooks/TokenContext'
import { Event, FileSelectedEvent, UploadedEvent, UploadFailedEvent } from '../../types/event'
import { UploadLog, JsonUploadData } from '../../types/pinata'
import { Pattern, Size } from '../../types/common'

interface IpfsUploaderProps {
  pinataApiJwt: string
  callback: (event: Event) => void
  enableMetadata: boolean
  enableChangeName: boolean
  imageSize: Size
  pattern: Pattern
}

const IpfsUploader: FunctionComponent<IpfsUploaderProps> = ({
  pinataApiJwt,
  callback,
  enableMetadata,
  enableChangeName,
  imageSize,
  pattern,
}) => {
  const [disabledForm, setDisabledForm] = useState(false)

  const fileSelected = (file: File) => {
    const event: FileSelectedEvent = {
      eventType: 'FILE_SELECTED',
      file,
    }
    callback(event)
  }

  const fileUploaded = (data: File | JsonUploadData, log: UploadLog) => {
    setDisabledForm(false)
    const event: UploadedEvent = {
      eventType: 'UPLOADED',
      data,
      log,
    }
    callback(event)
  }

  const fileUploadFailed = (message: string) => {
    setDisabledForm(false)
    const event: UploadFailedEvent = {
      eventType: 'UPLOAD_FAILED',
      message,
    }
    callback(event)
  }

  const fileUploadStarted = () => {
    setDisabledForm(true)
  }

  return (
    <ChakraProvider>
      <ImageContext.Provider value={useImageProvider()}>
        <AudioContext.Provider value={useAudioProvider()}>
          <TokenContext.Provider value={useTokenProvider()}>
            <TokenForm enableMetadataName={enableMetadata} enableKeyValue={enableMetadata} disable={disabledForm} />
            <ImageView enableChangeName={enableChangeName} imageSize={imageSize} disable={disabledForm} />
            {pattern === 'audio' && <AudioView enableChangeName={enableChangeName} disable={disabledForm} />}
            <Stack spacing="2" direction="row" justify="center" mt="2">
              <ImageSelector imageSelected={fileSelected} />
              {pattern === 'audio' && <AudioSelector audioSelected={fileSelected} />}
              <UploadButton
                fileUploadStarted={fileUploadStarted}
                fileUploaded={fileUploaded}
                fileUploadFailed={fileUploadFailed}
                pinataApiJwt={pinataApiJwt}
                pattern={pattern}
              />
            </Stack>
          </TokenContext.Provider>
        </AudioContext.Provider>
      </ImageContext.Provider>
    </ChakraProvider>
  )
}

export { IpfsUploader, IpfsUploaderProps }
