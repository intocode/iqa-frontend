import { Logo } from '../components/layout/header/Logo';

export default {
  title: 'Logo',
  component: Logo,
};

const Template = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const NoColor = Template.bind({});
NoColor.args = {
  noColor: true,
};

export const Long = Template.bind({});
Long.args = {
  long: true,
};
