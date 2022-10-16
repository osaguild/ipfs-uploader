import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IpfsUploader } from '../'
import 'dotenv/config'

const PINATA_API_JWT = process.env.REACT_APP_PINATA_API_JWT as string

export default {
  title: 'IpfsUploader',
  component: IpfsUploader,
} as ComponentMeta<typeof IpfsUploader>

const Template: ComponentStory<typeof IpfsUploader> = () => (
  <IpfsUploader
    callback={(event) => console.log('event is occurred:', event)}
    config={{
      enableChange: { metadataName: false, metadataKeyValue: false, imageName: true, audioName: true },
      imageSize: 'm',
      pattern: 'image',
      pinataApiJwt: PINATA_API_JWT,
    }}
  />
)

export const ImageEnableChangeName = Template.bind({})
