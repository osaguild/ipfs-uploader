import { createContext, Dispatch } from 'react'

type Context = {
  file: File | undefined
  setFile: Dispatch<File> | undefined
}

const initialize = {
  file: new File(['test'], 'sample.jpeg'),
  setFile: (value: File) => {
    console.log('File:', value)
  },
} as Context

const FileContext = createContext(initialize)

export { FileContext }
