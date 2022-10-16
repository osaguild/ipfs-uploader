import { FunctionComponent, ChangeEvent } from 'react'
import { Input, Text, FormControl, FormLabel, FormErrorMessage, Box } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useAudioContext } from '../../hooks/AudioContext'

interface AudioViewProps {
  enableChangeName: boolean
  disable: boolean
}

const AudioView: FunctionComponent<AudioViewProps> = ({ enableChangeName, disable }) => {
  const { audio, audioName, setAudioName } = useAudioContext()

  const handleAudioNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setAudioName) setAudioName(e.target.value)
  }

  const audioNameIsValid = !audioName ? true : audioName?.length === 0 ? true : false

  return audio ? (
    <Box my="4" textAlign="center">
      <Text as="b" fontSize="lg">
        <CheckCircleIcon color="green" boxSize="5" mr="2" />
        audio is uploaded
      </Text>
      {enableChangeName ? (
        <FormControl id="audio-name" isInvalid={audioNameIsValid} isRequired>
          <FormLabel>audio name</FormLabel>
          <Input
            placeholder={audio.name}
            size="md"
            value={audioName}
            onChange={handleAudioNameChange}
            disabled={disable}
            data-testid="audio-view-audio-name-input"
          />
          {audioNameIsValid && <FormErrorMessage>audio name is required</FormErrorMessage>}
        </FormControl>
      ) : (
        <Text textAlign="center" data-testid="audio-view-audio-name-text">
          {audio.name}
        </Text>
      )}
    </Box>
  ) : (
    <></>
  )
}

export { AudioView, AudioViewProps }
