import { createContext, Dispatch, useState, useContext, useMemo } from 'react'

type AudioState = {
  audio: File | undefined
  audioName: string | undefined
  dataUrl: string | undefined
  setAudio: Dispatch<File | undefined> | undefined
  setAudioName: Dispatch<string | undefined> | undefined
}

const initialize: AudioState = {
  audio: undefined,
  audioName: undefined,
  dataUrl: undefined,
  setAudio: undefined,
  setAudioName: undefined,
}

const AudioContext = createContext(initialize)

const useAudioContext = () => useContext(AudioContext)

const useAudioProvider = () => {
  const [audio, setAudio] = useState(initialize.audio)
  const [audioName, setAudioName] = useState(initialize.audioName)
  const [dataUrl, setDataUrl] = useState(initialize.dataUrl)

  useMemo(() => {
    if (audio) {
      // set default audioName from audio
      setAudioName(audio.name)

      // dataUrl from audio
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) setDataUrl(e.target?.result as string)
      }
      reader.readAsDataURL(audio)
    } else {
      setDataUrl(undefined)
    }
  }, [audio])

  return {
    audio,
    audioName,
    dataUrl,
    setAudio,
    setAudioName,
  } as AudioState
}

export { AudioContext, AudioState, useAudioProvider, useAudioContext }
