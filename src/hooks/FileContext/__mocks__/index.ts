import { createContext, useContext, useState } from 'react'
import { FileState } from '..'

const initialize: FileState = {
  file: new File(['test'], 'sample.jpeg', {
    type: 'image/jpeg',
  }),
  dataUrl: '	data:image/jpeg',
  setFile: (file: File | undefined) => {
    console.log('[mock]FileContext.setFile() is called.')
    console.log('[param]file:', file)
  },
}

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
