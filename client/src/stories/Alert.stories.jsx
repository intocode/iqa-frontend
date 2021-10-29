import { Alert } from "../components/Alert/Alert";
export default {
  title: "Example/Alert",
  component: Alert,
  argTypes: {
    // color: { control: "color" },
    color: {
      options: ["success", "secondary", "danger", "warning"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <Alert {...args}>Alert</Alert>;

export const Variants = Template.bind({});
Variants.args = {
  contrast: false,
  onClose: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  contrast: false,
  onClose: false,
};
