import { FunctionComponent } from 'react'
import { Button } from '@chakra-ui/react'

interface FileSelectorProps {
  callback: () => void
}

const FileSelector: FunctionComponent<FileSelectorProps> = ({ callback }) => {
  return (
    <Button colorScheme="teal" variant="solid" onClick={callback}>
      Upload
    </Button>
  )
}

export { FileSelector, FileSelectorProps }
