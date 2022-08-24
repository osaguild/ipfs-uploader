import { FunctionComponent, createRef, useContext, ChangeEvent } from 'react'
import { Button } from '@chakra-ui/react'
import { FileContext } from '../../hooks/useFileContext'

const FileSelector: FunctionComponent = () => {
  const fileInput = createRef<HTMLInputElement>()
  const { file, setFile } = useContext(FileContext)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setFile && event.target.files?.[0]) setFile(event.target.files?.[0])
  }
  const click = () => {
    fileInput.current?.click()
  }

  return (
    <div>
      <Button colorScheme="teal" variant="solid" onClick={click} disabled={file ? true : false}>
        Select
      </Button>
      <input hidden ref={fileInput} type="file" onChange={handleChange} />
    </div>
  )
}

export { FileSelector }
