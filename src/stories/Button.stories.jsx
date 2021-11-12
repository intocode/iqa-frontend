import styled from 'styled-components';
import { Button } from '../components/Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    color: { control: 'color' },
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

const StyledDecorator = styled.div`
  & > button {
    margin-right: 15px;
  }
`;
export const All = () => (
  <StyledDecorator>
    <Button color="primary">Click me</Button>
    <Button color="success">Click me</Button>
    <Button color="danger">Click me</Button>
    <Button color="gray">Click me</Button>
    <Button color="warning">Click me</Button>
  </StyledDecorator>
);
