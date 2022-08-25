import { createContext, useContext, useState } from 'react'
import { FileState } from '../index'

const initialize = {
  file: new File(['test'], 'sample.jpeg'),
  setFile: (value: File) => {
    console.log('File:', value)
  },
} as FileState

const FileContext = createContext(initialize)

const useFileContext = () => useContext(FileContext)

const useFileProvider = () => {
  const [file, setFile] = useState(initialize.file)

  return {
    file,
    setFile,
  } as FileState
}

export { FileContext, FileState, useFileProvider, useFileContext }
