import { Rate } from '../components/ui';

export default {
  title: 'Rate',
  component: Rate,
};

const Template = (args) => <Rate {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentRate: 0,
};

export const VariantPlus = Template.bind({});
VariantPlus.args = {
  currentRate: 67,
};

export const VariantMinus = Template.bind({});
VariantMinus.args = {
  currentRate: -41,
};

export const VariantUpArrow = Template.bind({});
VariantUpArrow.args = {
  currentRate: 7,
  isUpped: true,
};

export const VariantDownArrow = Template.bind({});
VariantDownArrow.args = {
  currentRate: 579,
  isDowned: true,
};
