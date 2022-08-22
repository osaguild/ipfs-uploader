import { FunctionComponent } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { FileSelector } from './FileSelector'

const IpfsUploader: FunctionComponent = () => {
  const callback = () => console.log('click!')
  return (
    <ChakraProvider>
      <FileSelector callback={callback} />
    </ChakraProvider>
  )
}

export { IpfsUploader }
