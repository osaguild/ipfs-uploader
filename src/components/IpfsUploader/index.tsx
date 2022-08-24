import { FunctionComponent } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { FileSelector } from '../FileSelector'
import { FileImage } from '../FileImage'
import { Upload } from '../Upload'
import { FileContext, useFileProvider } from '../../hooks/useFileContext'

const IpfsUploader: FunctionComponent = () => {
  return (
    <ChakraProvider>
      <FileContext.Provider value={useFileProvider()}>
        <FileSelector />
        <FileImage />
        <Upload
          success={(metadata) => console.log('success', metadata)}
          failed={(message) => console.log('failed', message)}
        />
      </FileContext.Provider>
    </ChakraProvider>
  )
}

export { IpfsUploader }
