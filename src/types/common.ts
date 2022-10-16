type Pattern = 'image' | 'audio'
type Size = 's' | 'm' | 'l'
type Config = {
  enableChange: {
    metadataName: boolean
    metadataKeyValue: boolean
    imageName: boolean
    audioName: boolean
  }
  imageSize: Size
  pattern: Pattern
  pinataApiJwt: string
}

export { Pattern, Size, Config }
