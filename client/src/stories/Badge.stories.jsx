import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import styled from 'styled-components';

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

const Template = (args) => <Badge {...args}></Badge>;

export const Default = Template.bind({});
Default.args = {};

const StyledDecorator = styled.div`
  & > div {
    margin-left: 15px;
  }
`;

export const All = () => {
  return (
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
};
