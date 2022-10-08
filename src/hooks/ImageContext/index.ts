import { createContext, Dispatch, useState, useContext, useMemo } from 'react'

type ImageState = {
  image: File | undefined
  imageName: string | undefined
  dataUrl: string | undefined
  setImage: Dispatch<File | undefined> | undefined
  setImageName: Dispatch<string | undefined> | undefined
}

const initialize: ImageState = {
  image: undefined,
  imageName: undefined,
  dataUrl: undefined,
  setImage: undefined,
  setImageName: undefined,
}

const ImageContext = createContext(initialize)

const useImageContext = () => useContext(ImageContext)

const useImageProvider = () => {
  const [image, setImage] = useState(initialize.image)
  const [imageName, setImageName] = useState(initialize.imageName)
  const [dataUrl, setDataUrl] = useState(initialize.dataUrl)

  useMemo(() => {
    if (image) {
      // set default imageName from image
      setImageName(image.name)

      // dataUrl from image
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) setDataUrl(e.target?.result as string)
      }
      reader.readAsDataURL(image)
    } else {
      setDataUrl(undefined)
    }
  }, [image])

  return {
    image,
    imageName,
    dataUrl,
    setImage,
    setImageName,
  } as ImageState
}

export { ImageContext, ImageState, useImageProvider, useImageContext }
