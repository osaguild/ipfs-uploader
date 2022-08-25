import { FunctionComponent } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { FileSelector } from '../FileSelector'
import { FileImage } from '../FileImage'
import { UploadButton } from '../UploadButton'
import { FileContext, useFileProvider } from '../../hooks/FileContext'

interface IpfsUploaderProps {
  pinataApiJwt: string
}

const IpfsUploader: FunctionComponent<IpfsUploaderProps> = ({ pinataApiJwt }) => {
  return (
    <ChakraProvider>
      <FileContext.Provider value={useFileProvider()}>
        <FileSelector />
        <FileImage />
        <UploadButton
          success={(metadata) => console.log('success', metadata)}
          failed={(message) => console.log('failed', message)}
          pinataApiJwt={pinataApiJwt}
        />
      </FileContext.Provider>
    </ChakraProvider>
  )
}

export { IpfsUploader, IpfsUploaderProps }
