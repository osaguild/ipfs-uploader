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
    pinataApiJwt={PINATA_API_JWT}
    callback={(event) => console.log('event is occurred:', event)}
    enableMetadata={false}
    enableChangeName={true}
    imageSize="s"
    pattern="image"
  />
)

export const ImageSizeS = Template.bind({})
