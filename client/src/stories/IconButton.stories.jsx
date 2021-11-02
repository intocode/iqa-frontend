import { IconButton } from '../components/IconButton/IconButton';

export default {
  title: 'Example/IconButton',
  component: IconButton,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = (args) => <IconButton {...args} />;

export const Variants = Template.bind({});

Variants.args = {};
