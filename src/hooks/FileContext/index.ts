import { createContext, Dispatch, useState, useContext } from 'react'

type FileState = {
  file: File | undefined
  setFile: Dispatch<File> | undefined
}

const initialize: FileState = {
  file: undefined,
  setFile: undefined,
}

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
