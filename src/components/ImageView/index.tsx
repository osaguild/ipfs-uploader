import { FunctionComponent, ChangeEvent } from 'react'
import { Input, Image, Text, FormControl, FormLabel, FormErrorMessage, Center } from '@chakra-ui/react'
import { useImageContext } from '../../hooks/ImageContext'
import { Size } from '../../types/common'

interface ImageViewProps {
  enableChangeName: boolean
  imageSize: Size
  disable: boolean
}

const ImageView: FunctionComponent<ImageViewProps> = ({ enableChangeName, imageSize, disable }) => {
  const { image, imageName, dataUrl, setImageName } = useImageContext()

  const handleImageNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setImageName) setImageName(e.target.value)
  }

  const imageNameIsValid = !imageName ? true : imageName?.length === 0 ? true : false

  return image ? (
    <>
      <Center>
        <Image
          src={dataUrl}
          boxSize={imageSize === 's' ? '100px' : imageSize === 'l' ? '300px' : '200px'}
          data-testid="image-view-image"
        />
      </Center>
      {enableChangeName ? (
        <FormControl id="image-name" isInvalid={imageNameIsValid} isRequired>
          <FormLabel>image name</FormLabel>
          <Input
            placeholder={image.name}
            size="md"
            value={imageName}
            onChange={handleImageNameChange}
            disabled={disable}
            data-testid="image-view-image-name-input"
          />
          {imageNameIsValid && <FormErrorMessage>image name is required</FormErrorMessage>}
        </FormControl>
      ) : (
        <Text textAlign="center" data-testid="image-view-image-name-text">
          {image.name}
        </Text>
      )}
    </>
  ) : (
    <></>
  )
}

export { ImageView, ImageViewProps }
