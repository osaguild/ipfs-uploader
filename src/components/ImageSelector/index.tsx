import { FunctionComponent, createRef, ChangeEvent } from 'react'
import { Button } from '@chakra-ui/react'
import { useImageContext } from '../../hooks/ImageContext'

interface ImageSelectorProps {
  imageSelected: (image: File) => void
}

const ImageSelector: FunctionComponent<ImageSelectorProps> = ({ imageSelected }) => {
  const imageInput = createRef<HTMLInputElement>()
  const { image, setImage } = useImageContext()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setImage && event.target.files?.[0]) {
      setImage(event.target.files?.[0])
      imageSelected(event.target.files?.[0])
    }
  }
  const click = () => {
    imageInput.current?.click()
  }

  return (
    <>
      <Button onClick={click} disabled={image ? true : false} width="100" data-testid="image-selector-button">
        Image
      </Button>
      <input
        hidden
        ref={imageInput}
        type="file"
        onChange={handleChange}
        accept="image/*"
        data-testid="image-selector-input"
      />
    </>
  )
}

export { ImageSelector, ImageSelectorProps }
