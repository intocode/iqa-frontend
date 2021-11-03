import styled from 'styled-components';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

export default {
  title: 'Example/Badge',
  component: Badge,
  argTypes: {
    color: {
      options: ['danger', 'warning'],
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

const StyledDecorator = styled.div`
  & > div {
    margin-left: 15px;
  }
`;

export const All = () => (
  <StyledDecorator>
    <Badge content={5} color="danger">
      <Button color="danger">Click me</Button>
    </Badge>
    <Badge content={12} color="warning">
      <Button color="warning">Click me</Button>
    </Badge>
    <Badge color="warning">
      <Button color="warning">Click me</Button>
    </Badge>
    <Badge color="danger">
      <Button color="danger">Click me</Button>
    </Badge>
  </StyledDecorator>
);
