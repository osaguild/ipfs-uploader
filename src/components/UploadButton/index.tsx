import { FunctionComponent, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useImageContext } from '../../hooks/ImageContext'
import { useAudioContext } from '../../hooks/AudioContext'
import { useTokenContext } from '../../hooks/TokenContext'
import { uploadFile, uploadJson } from '../../lib/pinata'
import { ValidationError } from '../../errors'
import { generateFormData, generateJsonData } from './generator'
import { AxiosError } from 'axios'
import { Pattern } from '../../types/common'
import { UploadedData } from '../../types/event'

interface UploadButtonProps {
  uploading: () => void
  validationError: (message: string) => void
  success: (uploadedData: UploadedData[]) => void
  failed: (message: string) => void
  pinataApiJwt: string
  pattern: Pattern
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({
  uploading,
  validationError,
  success,
  failed,
  pinataApiJwt,
  pattern,
}) => {
  const [loading, setLoading] = useState(false)
  const { image, imageName, setImage } = useImageContext()
  const { audio, audioName, setAudio } = useAudioContext()
  const { name, description, metadataName, metadataKey, metadataValue } = useTokenContext()

  const upload = async () => {
    try {
      // validation
      if (!image || !imageName || !setImage) throw new ValidationError('image is not set')
      else if (pattern === 'audio' && (!audio || !audioName || !setAudio)) throw new ValidationError('audio is not set')
      else if (name === '') throw new ValidationError('name is not set')
      else if (description === '') throw new ValidationError('description is not set')
      else if (metadataKey !== '' && metadataValue === '') throw new ValidationError('value is not set')
      else if (metadataKey === '' && metadataValue !== '') throw new ValidationError('key is not set')

      // start upload
      uploading()
      setLoading(true)
      const uploadedData: UploadedData[] = []

      // upload image to pinata
      const imageData = generateFormData(image, imageName, metadataKey, metadataValue)
      const uploadImageLog = await uploadFile(imageData, pinataApiJwt)
      uploadedData.push({ data: image, log: uploadImageLog })

      // upload audio to Pinata
      let uploadAudioLog = undefined
      if (pattern === 'audio' && audio) {
        const audioData = generateFormData(audio, audioName as string, metadataKey, metadataValue)
        uploadAudioLog = await uploadFile(audioData, pinataApiJwt)
        uploadedData.push({ data: audio, log: uploadAudioLog })
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
      uploadedData.push({ data: jsonData, log: uploadJsonLog })

      // end upload
      success(uploadedData)
      setImage(undefined)
      if (pattern === 'audio' && setAudio) setAudio(undefined)
      setLoading(false)
    } catch (e) {
      console.log(e)
      if (e instanceof ValidationError) {
        validationError(e.message)
      } else if (e instanceof AxiosError) {
        failed('pinata api call is failed')
      } else {
        failed('unknown error')
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
