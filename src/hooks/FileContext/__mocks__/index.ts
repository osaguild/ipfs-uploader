import { createContext, useContext, useState } from 'react'
import { FileState } from '..'

const initialize = {
  file: new File(['test'], 'sample.jpeg'),
  dataUrl: '	data:image/jpeg',
  setFile: (value: File) => {
    console.log('File:', value)
  },
} as FileState

const FileContext = createContext(initialize)

const useFileContext = () => useContext(FileContext)

const useFileProvider = () => {
  const [file, setFile] = useState(initialize.file)
  const [dataUrl] = useState(initialize.dataUrl)

  return {
    file,
    dataUrl,
    setFile,
  } as FileState
}

export { FileContext, FileState, useFileProvider, useFileContext }
