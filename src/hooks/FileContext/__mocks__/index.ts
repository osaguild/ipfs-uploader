import { createContext, useContext, useState } from 'react'
import { FileState } from '..'

const initialize: FileState = {
  file: new File(['test'], 'sample.jpeg', {
    type: 'image/jpeg',
  }),
  fileName: 'sample_name',
  dataUrl: '	data:image/jpeg',
  setFile: (file: File | undefined) => {
    console.log('[mock]FileContext.setFile() is called.')
    console.log('[param]file:', file)
  },
  setFileName: (fileName: string | undefined) => {
    console.log('[mock]FileContext.setFileName() is called.')
    console.log('[param]fileName:', fileName)
  },
}

const FileContext = createContext(initialize)

const useFileContext = () => useContext(FileContext)

const useFileProvider = () => {
  const [file, setFile] = useState(initialize.file)
  const [fileName, setFileName] = useState(initialize.fileName)
  const [dataUrl] = useState(initialize.dataUrl)

  return {
    file,
    fileName,
    dataUrl,
    setFile,
    setFileName,
  } as FileState
}

export { FileContext, FileState, useFileProvider, useFileContext }
