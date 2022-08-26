import { createContext, Dispatch, useState, useContext, useMemo } from 'react'

type FileState = {
  file: File | undefined
  dataUrl: string | undefined
  setFile: Dispatch<File | undefined> | undefined
}

const initialize: FileState = {
  file: undefined,
  dataUrl: undefined,
  setFile: undefined,
}

const FileContext = createContext(initialize)

const useFileContext = () => useContext(FileContext)

const useFileProvider = () => {
  const [file, setFile] = useState(initialize.file)
  const [dataUrl, setDataUrl] = useState(initialize.dataUrl)

  useMemo(() => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) setDataUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setDataUrl(undefined)
    }
  }, [file])

  return {
    file,
    dataUrl,
    setFile,
  } as FileState
}

export { FileContext, FileState, useFileProvider, useFileContext }
