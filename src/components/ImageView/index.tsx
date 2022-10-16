import { FunctionComponent, ChangeEvent } from 'react'
import { Input, Image, Text, FormControl, FormLabel, FormErrorMessage, Center, Box } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
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
    <Box my="4" textAlign="center">
      <Text as="b" fontSize="lg">
        <CheckCircleIcon color="green" boxSize="5" mr="2" />
        image is uploaded
      </Text>
      <Center mt="2">
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
    </Box>
  ) : (
    <></>
  )
}

export { ImageView, ImageViewProps }
