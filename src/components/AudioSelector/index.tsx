import { FunctionComponent, createRef, ChangeEvent } from 'react'
import { Button } from '@chakra-ui/react'
import { useAudioContext } from '../../hooks/AudioContext'

interface AudioSelectorProps {
  selected: (audio: File) => void
}

const AudioSelector: FunctionComponent<AudioSelectorProps> = ({ selected }) => {
  const audioInput = createRef<HTMLInputElement>()
  const { audio, setAudio } = useAudioContext()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setAudio && event.target.files?.[0]) {
      setAudio(event.target.files?.[0])
      selected(event.target.files?.[0])
    }
  }
  const click = () => {
    audioInput.current?.click()
  }

  return (
    <>
      <Button onClick={click} disabled={audio ? true : false} width="100" data-testid="audio-selector-button">
        Audio
      </Button>
      <input
        hidden
        ref={audioInput}
        type="file"
        onChange={handleChange}
        accept="audio/*"
        data-testid="audio-selector-input"
      />
    </>
  )
}

export { AudioSelector, AudioSelectorProps }
