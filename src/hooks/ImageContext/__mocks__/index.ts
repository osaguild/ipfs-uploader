import { createContext, useContext, useState } from 'react'
import { ImageState } from '..'

const initialize: ImageState = {
  image: new File(['test'], 'sample.jpeg', {
    type: 'image/jpeg',
  }),
  imageName: 'sample_image',
  dataUrl: '	data:image/jpeg',
  setImage: (image: File | undefined) => {
    console.log('[mock]ImageContext.setImage() is called.')
    console.log('[param]image:', image)
  },
  setImageName: (imageName: string | undefined) => {
    console.log('[mock]ImageContext.setImageName() is called.')
    console.log('[param]imageName:', imageName)
  },
}

const ImageContext = createContext(initialize)

const useImageContext = () => useContext(ImageContext)

const useImageProvider = () => {
  const [image, setImage] = useState(initialize.image)
  const [imageName, setImageName] = useState(initialize.imageName)
  const [dataUrl] = useState(initialize.dataUrl)

  return {
    image,
    imageName,
    dataUrl,
    setImage,
    setImageName,
  } as ImageState
}

export { ImageContext, ImageState, useImageProvider, useImageContext }
