import { Button } from "../components/Button/Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    color: { control: "color" },
  },
};

const Template = (args) => <Button {...args}>Click me</Button>;

export const Variants = Template.bind({});
Variants.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  contrast: false,
};

export const Preloader = Template.bind({});
Preloader.args = {
  loading: true,
};

export const Rounded = Template.bind({});
Rounded.args = {
  rounded: true,
};
