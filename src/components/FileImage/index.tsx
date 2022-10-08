import { FunctionComponent, ChangeEvent } from 'react'
import { Input, Image, Text, FormControl, FormLabel, FormErrorMessage, Center } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'

interface FileImageProps {
  enableChangeName: boolean
}

const FileImage: FunctionComponent<FileImageProps> = ({ enableChangeName }) => {
  const { file, fileName, dataUrl, setFileName } = useFileContext()

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setFileName) setFileName(e.target.value)
  }

  const fileNameIsValid = !fileName ? true : fileName?.length === 0 ? true : false

  return file ? (
    <>
      <Center>
        <Image src={dataUrl} boxSize="100px" data-testid="file-image-image" />
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

export { FileImage }
