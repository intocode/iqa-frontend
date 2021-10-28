import { Button } from "../components/Button/Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    color: { control: "color" },
  },
};

const Template = (args) => <Button {...args}>CLick me</Button>;

export const Variants = Template.bind({});
Variants.args = {
  contrast: false,
  color: "primary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  contrast: false,
  color: "primary",
};

export const Preloader = Template.bind({});
Preloader.args = {
  color: "primary",
  loading: true,
};

export const Rounded = Template.bind({});
Rounded.args = {
  color: "primary",
  rounded: true,
};
