import { FunctionComponent, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useImageContext } from '../../hooks/ImageContext'
import { useAudioContext } from '../../hooks/AudioContext'
import { useTokenContext } from '../../hooks/TokenContext'
import { uploadFile, uploadJson } from '../../lib/pinata'
import { ValidationError } from '../../errors'
import { JsonUploadData, UploadLog } from '../../types/pinata'
import { generateFormData, generateJsonData } from './generator'
import { AxiosError } from 'axios'
import { Pattern } from '../../types/common'

interface UploadButtonProps {
  fileUploadStarted: () => void
  fileUploaded: (data: JsonUploadData | File, log: UploadLog) => void
  fileUploadFailed: (message: string) => void
  pinataApiJwt: string
  pattern: Pattern
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({
  fileUploadStarted,
  fileUploaded,
  fileUploadFailed,
  pinataApiJwt,
  pattern,
}) => {
  const [loading, setLoading] = useState(false)
  const { image, imageName, setImage } = useImageContext()
  const { audio, audioName, setAudio } = useAudioContext()
  const { name, description, metadataName, metadataKey, metadataValue } = useTokenContext()

  const upload = async () => {
    // validation
    if (!image || !imageName || !setImage) throw new ValidationError('image is not set')
    else if (pattern === 'audio' && (!audio || !audioName || !setAudio)) throw new ValidationError('audio is not set')
    else if (name === '') throw new ValidationError('name is not set')
    else if (description === '') throw new ValidationError('description is not set')
    else if (metadataKey !== '' && metadataValue === '') throw new ValidationError('value is not set')
    else if (metadataKey === '' && metadataValue !== '') throw new ValidationError('key is not set')

    try {
      // start upload
      fileUploadStarted()
      setLoading(true)

      // upload image to pinata
      const imageData = generateFormData(image, imageName, metadataKey, metadataValue)
      const uploadImageLog = await uploadFile(imageData, pinataApiJwt)
      fileUploaded(image, uploadImageLog)

      // upload audio to Pinata
      let uploadAudioLog = undefined
      if (pattern === 'audio') {
        const audioData = generateFormData(audio as File, audioName as string, metadataKey, metadataValue)
        uploadAudioLog = await uploadFile(audioData, pinataApiJwt)
        fileUploaded(image, uploadAudioLog)
      }

      // upload metadata to pinata
      const jsonData = generateJsonData(
        name,
        description,
        uploadImageLog.IpfsHash,
        uploadAudioLog?.IpfsHash,
        metadataName !== '' ? metadataName : name,
        metadataKey !== '' ? metadataKey : undefined,
        metadataValue !== '' ? metadataValue : undefined
      )
      const uploadJsonLog = await uploadJson(JSON.stringify(jsonData), pinataApiJwt)
      fileUploaded(jsonData, uploadJsonLog)

      // end upload
      setImage(undefined)
      setLoading(false)
    } catch (e) {
      console.log(e)
      if (e instanceof ValidationError) {
        fileUploadFailed(e.message)
      } else if (e instanceof AxiosError) {
        fileUploadFailed('pinata api call is failed')
      } else {
        fileUploadFailed('unknown error')
      }
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={upload}
      disabled={!image ? true : pattern === 'audio' && !audio ? true : loading ? true : false}
      width="100"
      isLoading={loading}
      data-testid="upload-button-button"
    >
      Upload
    </Button>
  )
}

export { UploadButton, UploadButtonProps }
