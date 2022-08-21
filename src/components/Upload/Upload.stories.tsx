import * as React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Upload from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Upload',
  component: Upload,
} as ComponentMeta<typeof Upload>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  message: 'hello uploader',
}
