import  type { Meta, StoryObj } from '@storybook/react'
import { ToolbarButton } from './ToolbarButton'

const meta = {
  title: 'Components/ToolbarButton',
  component: ToolbarButton,
} satisfies Meta<typeof ToolbarButton>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Bold',
    onPress: (e) => console.log('clicked'),
    isActive: false,
  }
}
