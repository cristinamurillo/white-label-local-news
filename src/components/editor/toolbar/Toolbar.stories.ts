import  type { Meta, StoryObj } from '@storybook/react'
import { Toolbar } from './Toolbar';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
} satisfies Meta<typeof Toolbar>

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
