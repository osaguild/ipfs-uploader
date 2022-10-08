import { FunctionComponent, ChangeEvent } from 'react'
import { Input, Image, Text } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'

interface FileImageProps {
  enableChangeName: boolean
}

const FileImage: FunctionComponent<FileImageProps> = ({ enableChangeName }) => {
  const { file, fileName, dataUrl, setFileName } = useFileContext()

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setFileName) setFileName(e.target.value)
  }

  return file ? (
    <div>
      <Image src={dataUrl} boxSize="100px" data-testid="file-image-image" />
      {enableChangeName ? (
        <Input
          placeholder={file.name}
          size="md"
          value={fileName}
          onChange={handleFileNameChange}
          data-testid="file-image-file-name-input"
        />
      ) : (
        <Text data-testid="file-image-file-name-text">{file.name}</Text>
      )}
    </div>
  ) : (
    <></>
  )
}

export { FileImage }
