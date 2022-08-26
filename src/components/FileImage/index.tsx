import { FunctionComponent } from 'react'
import { Text, Image } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'

const FileImage: FunctionComponent = () => {
  const { file, dataUrl } = useFileContext()

  return (
    <div>
      {file && (
        <Text fontSize="md" data-testid="file-image-text">
          {file.name}
        </Text>
      )}
      {dataUrl && <Image src={dataUrl} boxSize="100px" data-testid="file-image-image" />}
    </div>
  )
}

export { FileImage }
