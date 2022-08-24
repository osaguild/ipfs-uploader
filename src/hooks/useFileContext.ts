import { createContext, Dispatch, useState } from 'react'

type Context = {
  file: File | undefined
  setFile: Dispatch<File> | undefined
}

const initialize: Context = {
  file: undefined,
  setFile: undefined,
}

const FileContext = createContext(initialize)

const useFileProvider = () => {
  const [file, setFile] = useState(initialize.file)

  return {
    file,
    setFile,
  } as Context
}

export { FileContext, useFileProvider }
