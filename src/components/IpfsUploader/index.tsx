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
import { UploadedData, Event, SelectedEvent, UploadingEvent, SuccessEvent, FailedEvent } from '../../types/event'
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

  const imageSelected = (file: File) => {
    const event: SelectedEvent = {
      eventType: 'SELECTED',
      dataType: 'IMAGE',
      file,
    }
    callback(event)
  }

  const audioSelected = (file: File) => {
    const event: SelectedEvent = {
      eventType: 'SELECTED',
      dataType: 'AUDIO',
      file,
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
            <TokenForm enableMetadataName={enableMetadata} enableKeyValue={enableMetadata} disable={disabledForm} />
            <ImageView enableChangeName={enableChangeName} imageSize={imageSize} disable={disabledForm} />
            {pattern === 'audio' && <AudioView enableChangeName={enableChangeName} disable={disabledForm} />}
            <Stack spacing="2" direction="row" justify="center" mt="2">
              <ImageSelector selected={imageSelected} />
              {pattern === 'audio' && <AudioSelector selected={audioSelected} />}
              <UploadButton
                uploading={uploading}
                success={success}
                failed={failed}
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
