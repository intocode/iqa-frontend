import styled from 'styled-components';
import { Button } from '../components/ui/Button';
import startIcon from '../assets/Icon.svg';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    color: { control: 'color' },
  },
};

const StyledDecorator = styled.div`
  & > button {
    margin-right: 15px;
  }
`;

export const ContainsIcon = () => (
  <Button startIcon={startIcon} contrast>
    Click me
  </Button>
);

export const Variants = () => (
  <StyledDecorator>
    <Button>Click me</Button>
    <Button color="success">Click me</Button>
    <Button color="gray">Click me</Button>
    <Button color="danger">Click me</Button>
    <Button color="warning">Click me</Button>
  </StyledDecorator>
);

export const Contrasted = () => (
  <StyledDecorator>
    <Button contrast>Click me</Button>
    <Button contrast color="success">
      Click me
    </Button>
    <Button contrast color="gray">
      Click me
    </Button>
    <Button contrast color="danger">
      Click me
    </Button>
    <Button contrast color="warning">
      Click me
    </Button>
  </StyledDecorator>
);

export const Disabled = () => (
  <StyledDecorator>
    <Button disabled>Click me</Button>
    <Button disabled color="success">
      Click me
    </Button>
    <Button disabled color="gray">
      Click me
    </Button>
    <Button disabled color="danger">
      Click me
    </Button>
    <Button disabled color="warning">
      Click me
    </Button>
  </StyledDecorator>
);

export const Preloader = () => (
  <StyledDecorator>
    <Button loading>Click me</Button>
    <Button loading color="success">
      Click me
    </Button>
    <Button loading color="gray">
      Click me
    </Button>
    <Button loading color="danger">
      Click me
    </Button>
    <Button loading color="warning">
      Click me
    </Button>
  </StyledDecorator>
);

export const Rounded = () => (
  <StyledDecorator>
    <Button rounded>Click me</Button>
    <Button rounded color="success">
      Click me
    </Button>
    <Button rounded color="gray">
      Click me
    </Button>
    <Button rounded color="danger">
      Click me
    </Button>
    <Button rounded color="warning">
      Click me
    </Button>
  </StyledDecorator>
);
