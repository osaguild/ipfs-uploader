import { createContext, useContext, useState } from 'react'
import { AudioState } from '..'

const initialize: AudioState = {
  audio: new File(['test'], 'sample.mp3', {
    type: 'audio/mpeg',
  }),
  audioName: 'sample_audio',
  dataUrl: '	data:audio/mpeg',
  setAudio: (audio: File | undefined) => {
    console.log('[mock]AudioContext.setAudio() is called.')
    console.log('[param]audio:', audio)
  },
  setAudioName: (audioName: string | undefined) => {
    console.log('[mock]AudioContext.setAudioName() is called.')
    console.log('[param]audioName:', audioName)
  },
}

const AudioContext = createContext(initialize)

const useAudioContext = () => useContext(AudioContext)

const useAudioProvider = () => {
  const [audio, setAudio] = useState(initialize.audio)
  const [audioName, setAudioName] = useState(initialize.audioName)
  const [dataUrl] = useState(initialize.dataUrl)

  return {
    audio,
    audioName,
    dataUrl,
    setAudio,
    setAudioName,
  } as AudioState
}

export { AudioContext, AudioState, useAudioProvider, useAudioContext }
