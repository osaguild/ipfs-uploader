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
import {
  UploadedData,
  Event,
  FileSelectedEvent,
  ValidationErrorEvent,
  UploadingEvent,
  SuccessEvent,
  FailedEvent,
} from '../../types/event'
import { Pattern, Size } from '../../types/common'

interface IpfsUploaderProps {
  callback: (event: Event) => void
  config: Config
}

type Config = {
  enableChange: {
    metadataName: boolean
    metadataKeyValue: boolean
    imageName: boolean
    audioName: boolean
  }
  imageSize: Size
  pattern: Pattern
  pinataApiJwt: string
}

const IpfsUploader: FunctionComponent<IpfsUploaderProps> = ({ callback, config }) => {
  const [disabledForm, setDisabledForm] = useState(false)

  const imageSelected = (file: File) => {
    const event: FileSelectedEvent = {
      eventType: 'FILE_SELECTED',
      dataType: 'IMAGE',
      file,
    }
    callback(event)
  }

  const audioSelected = (file: File) => {
    const event: FileSelectedEvent = {
      eventType: 'FILE_SELECTED',
      dataType: 'AUDIO',
      file,
    }
    callback(event)
  }

  const validationError = (message: string) => {
    const event: ValidationErrorEvent = {
      eventType: 'VALIDATION_ERROR',
      message,
    }
    callback(event)
  }

  const uploading = () => {
    const event: UploadingEvent = {
      eventType: 'UPLOADING',
    }
    callback(event)
    setDisabledForm(true)
  }

  const success = (uploadedData: UploadedData[]) => {
    setDisabledForm(false)
    const event: SuccessEvent = {
      eventType: 'SUCCESS',
      uploadedData,
    }
    callback(event)
  }

  const failed = (message: string) => {
    setDisabledForm(false)
    const event: FailedEvent = {
      eventType: 'FAILED',
      message,
    }
    callback(event)
  }

  return (
    <ChakraProvider>
      <ImageContext.Provider value={useImageProvider()}>
        <AudioContext.Provider value={useAudioProvider()}>
          <TokenContext.Provider value={useTokenProvider()}>
            <TokenForm
              enableMetadataName={config.enableChange.metadataName}
              enableKeyValue={config.enableChange.metadataKeyValue}
              disable={disabledForm}
            />
            <ImageView
              enableChangeName={config.enableChange.imageName}
              imageSize={config.imageSize}
              disable={disabledForm}
            />
            {config.pattern === 'audio' && (
              <AudioView enableChangeName={config.enableChange.audioName} disable={disabledForm} />
            )}
            <Stack spacing="2" direction="row" justify="center" mt="2">
              <ImageSelector selected={imageSelected} />
              {config.pattern === 'audio' && <AudioSelector selected={audioSelected} />}
              <UploadButton
                uploading={uploading}
                validationError={validationError}
                success={success}
                failed={failed}
                pinataApiJwt={config.pinataApiJwt}
                pattern={config.pattern}
              />
            </Stack>
          </TokenContext.Provider>
        </AudioContext.Provider>
      </ImageContext.Provider>
    </ChakraProvider>
  )
}

export { IpfsUploader, IpfsUploaderProps }
