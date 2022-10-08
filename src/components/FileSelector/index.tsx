import { FunctionComponent, createRef, ChangeEvent } from 'react'
import { Button } from '@chakra-ui/react'
import { useFileContext } from '../../hooks/FileContext'

interface FileSelectorProps {
  fileSelected: (file: File) => void
}

const FileSelector: FunctionComponent<FileSelectorProps> = ({ fileSelected }) => {
  const fileInput = createRef<HTMLInputElement>()
  const { file, setFile } = useFileContext()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setFile && event.target.files?.[0]) {
      setFile(event.target.files?.[0])
      fileSelected(event.target.files?.[0])
    }
  }
  const click = () => {
    fileInput.current?.click()
  }

  return (
    <>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={click}
        disabled={file ? true : false}
        width="100"
        data-testid="file-selector-button"
      >
        Select
      </Button>
      <input
        hidden
        ref={fileInput}
        type="file"
        onChange={handleChange}
        accept="image/*"
        data-testid="file-selector-input"
      />
    </>
  )
}

export { FileSelector, FileSelectorProps }
