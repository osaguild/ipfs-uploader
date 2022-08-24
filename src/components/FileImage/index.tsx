import { FunctionComponent, useContext } from 'react'
import { Text } from '@chakra-ui/react'
import { FileContext } from '../../hooks/useFileContext'

const FileImage: FunctionComponent = () => {
  const { file } = useContext(FileContext)

  return <Text fontSize="md">{file?.name}</Text>
}

export { FileImage }
