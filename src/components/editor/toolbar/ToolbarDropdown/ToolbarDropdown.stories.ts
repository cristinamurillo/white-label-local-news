import React from "react"
import  type { Meta, StoryObj } from '@storybook/react'
import {ToolbarDropdown} from "./ToolbarDropdown";

const meta = {
  title: 'Components/ToolbarDropdown',
  component: ToolbarDropdown,
} satisfies Meta<typeof ToolbarDropdown>

export default meta;
type Story = StoryObj<typeof ToolbarDropdown>

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
