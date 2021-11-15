import { Logo } from '../components/Layout/Logo';

export default {
  title: 'Logo/Logo',
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
