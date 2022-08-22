import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IpfsUploader } from '../IpfsUploader'

export default {
  title: 'IpfsUploader',
  component: IpfsUploader,
} as ComponentMeta<typeof IpfsUploader>

const Template: ComponentStory<typeof IpfsUploader> = () => <IpfsUploader />

export const Default = Template.bind({})
