import { FunctionComponent } from 'react'
import { Text } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'

const FileImage: FunctionComponent = () => {
  const { file } = useFileContext()
  return (
    <Text fontSize="md" data-testid="file-image-text">
      {file?.name}
    </Text>
  )
}

export { FileImage }
