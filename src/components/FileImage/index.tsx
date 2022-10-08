import { FunctionComponent, ChangeEvent } from 'react'
import { Input, Image, Text, FormControl, FormLabel, FormErrorMessage, Center } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'

interface FileImageProps {
  enableChangeName: boolean
  imageSize: Size
}

type Size = 's' | 'm' | 'l'

const FileImage: FunctionComponent<FileImageProps> = ({ enableChangeName, imageSize }) => {
  const { file, fileName, dataUrl, setFileName } = useFileContext()

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setFileName) setFileName(e.target.value)
  }

  const fileNameIsValid = !fileName ? true : fileName?.length === 0 ? true : false

  return file ? (
    <>
      <Center>
        <Image
          src={dataUrl}
          boxSize={imageSize === 's' ? '100px' : imageSize === 'l' ? '300px' : '200px'}
          data-testid="file-image-image"
        />
      </Center>
      {enableChangeName ? (
        <FormControl id="file-name" isInvalid={fileNameIsValid} isRequired>
          <FormLabel>file name</FormLabel>
          <Input
            placeholder={file.name}
            size="md"
            value={fileName}
            onChange={handleFileNameChange}
            data-testid="file-image-file-name-input"
          />
          {fileNameIsValid && <FormErrorMessage>file name is required</FormErrorMessage>}
        </FormControl>
      ) : (
        <Text textAlign="center" data-testid="file-image-file-name-text">
          {file.name}
        </Text>
      )}
    </>
  ) : (
    <></>
  )
}

export { FileImage, Size }
