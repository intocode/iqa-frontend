import styled from 'styled-components';
import { Button } from '../components/ui/Button';

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

export const Variants = () => (
  <StyledDecorator>
    <Button contrast={false}>Click me</Button>
    <Button contrast={false} color="success">
      Click me
    </Button>
    <Button contrast={false} color="gray">
      Click me
    </Button>
    <Button contrast={false} color="danger">
      Click me
    </Button>
    <Button contrast={false} color="warning">
      Click me
    </Button>
  </StyledDecorator>
);

export const Contrasted = () => (
  <StyledDecorator>
    <Button>Click me</Button>
    <Button color="success">Click me</Button>
    <Button color="gray">Click me</Button>
    <Button color="danger">Click me</Button>
    <Button color="warning">Click me</Button>
  </StyledDecorator>
);

export const Disabled = () => (
  <StyledDecorator>
    <Button contrast={false} disabled>
      Click me
    </Button>
    <Button contrast={false} disabled color="success">
      Click me
    </Button>
    <Button contrast={false} disabled color="gray">
      Click me
    </Button>
    <Button contrast={false} disabled color="danger">
      Click me
    </Button>
    <Button contrast={false} disabled color="warning">
      Click me
    </Button>
  </StyledDecorator>
);

export const Preloader = () => (
  <StyledDecorator>
    <Button contrast={false} loading>
      Click me
    </Button>
    <Button contrast={false} loading color="success">
      Click me
    </Button>
    <Button contrast={false} loading color="gray">
      Click me
    </Button>
    <Button contrast={false} loading color="danger">
      Click me
    </Button>
    <Button contrast={false} loading color="warning">
      Click me
    </Button>
  </StyledDecorator>
);

export const Rounded = () => (
  <StyledDecorator>
    <Button contrast={false} rounded>
      Click me
    </Button>
    <Button contrast={false} rounded color="success">
      Click me
    </Button>
    <Button contrast={false} rounded color="gray">
      Click me
    </Button>
    <Button contrast={false} rounded color="danger">
      Click me
    </Button>
    <Button contrast={false} rounded color="warning">
      Click me
    </Button>
  </StyledDecorator>
);
