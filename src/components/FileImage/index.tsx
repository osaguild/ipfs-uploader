import { FunctionComponent, ChangeEvent } from 'react'
import { Input, Image } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'

const FileImage: FunctionComponent = () => {
  const { file, fileName, dataUrl, setFileName } = useFileContext()

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setFileName) setFileName(e.target.value)
  }

  return file ? (
    <div>
      <Image src={dataUrl} boxSize="100px" data-testid="file-image-image" />
      <Input
        placeholder={file.name}
        size="md"
        value={fileName}
        onChange={handleFileNameChange}
        data-testid="file-image-file-name"
      />
    </div>
  ) : (
    <></>
  )
}

export { FileImage }
