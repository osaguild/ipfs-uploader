import { createContext, Dispatch, useState, useContext, useMemo } from 'react'

type FileState = {
  file: File | undefined
  fileName: string | undefined
  dataUrl: string | undefined
  setFile: Dispatch<File | undefined> | undefined
  setFileName: Dispatch<string | undefined> | undefined
}

const initialize: FileState = {
  file: undefined,
  fileName: undefined,
  dataUrl: undefined,
  setFile: undefined,
  setFileName: undefined,
}

const FileContext = createContext(initialize)

const useFileContext = () => useContext(FileContext)

const useFileProvider = () => {
  const [file, setFile] = useState(initialize.file)
  const [fileName, setFileName] = useState(initialize.fileName)
  const [dataUrl, setDataUrl] = useState(initialize.dataUrl)

  useMemo(() => {
    if (file) {
      // set default fileName from file
      setFileName(file.name)

      // dataUrl from file
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
    fileName,
    dataUrl,
    setFile,
    setFileName,
  } as FileState
}

export { FileContext, FileState, useFileProvider, useFileContext }
