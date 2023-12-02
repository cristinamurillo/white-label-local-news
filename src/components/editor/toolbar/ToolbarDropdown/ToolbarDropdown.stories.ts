import  type { Meta, StoryObj } from '@storybook/react'
import {ToolbarDropdown} from "./ToolbarDropdown";

const meta = {
  title: 'Components/ToolbarDropdown',
  component: ToolbarDropdown,
} satisfies Meta<typeof ToolbarDropdown>

export default meta;
type Story = StoryObj<typeof meta>

//export const Primary: Story = {}
export const Primary: Story = {
  args: {
    ariaLabel: 'storybook dropdown',
    options: [
      'Cat',
      'Example',
      'Dog',
      'Horse',
    ],
  },
}
