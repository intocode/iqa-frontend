import { Typography } from '../components/Typography';

export default {
  title: 'Example/Typography',
  component: Typography,
};

const Template = (args) => (
  <Typography {...args}>{`Typography text ${args.children}`}</Typography>
);

export const Variants = Template.bind({});
Variants.args = {};

export const Header = Template.bind({});
Header.args = {
  variant: 'header',
};

export const Caption = Template.bind({});
Caption.args = {
  variant: 'caption',
};

export const Small = Template.bind({});
Small.args = {
  variant: 'small',
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  variant: 'extraSmall',
};
