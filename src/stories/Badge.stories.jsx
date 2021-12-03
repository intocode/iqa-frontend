import styled from 'styled-components';
import { Badge, Button } from '../components/ui';

export default {
  title: 'Badge',
  component: Badge,
  argTypes: {
    color: {
      options: ['danger', 'warning', 'primary'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => {
  return (
    <Badge {...args}>
      <button type="submit">native button</button>
    </Badge>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const ContainsLink = () => (
  <>
    <Badge content={5}>
      <a href="https://www.google.com/">google link</a>
    </Badge>
    <Badge color="danger">
      <a href="https://ya.ru/">yandex link</a>
    </Badge>
  </>
);

const StyledDecorator = styled.div`
  & > div {
    margin-left: 15px;
  }
`;

export const All = () => (
  <StyledDecorator>
    <Badge content={5} color="primary">
      <Button color="gray">Click me</Button>
    </Badge>
    <Badge content={12} color="warning">
      <Button color="success">Click me</Button>
    </Badge>
    <Badge color="success">
      <Button color="danger">Click me</Button>
    </Badge>
    <Badge color="gray">
      <Button color="primary">Click me</Button>
    </Badge>
  </StyledDecorator>
);
