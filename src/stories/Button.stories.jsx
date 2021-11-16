import styled from 'styled-components';
import PropTypes from 'prop-types';
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

const StyledIcon = styled.svg`
  fill: ${(props) => props.color};
`;

const SaveIcon = ({ color }) => (
  <StyledIcon
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
      stroke="#409EFF"
      strokeLinejoin="round"
    />
    <path d="M17 21V13H7V21" stroke="#409EFF" strokeLinejoin="round" />
    <path d="M7 3V8H15" stroke="#409EFF" strokeLinejoin="round" />
  </StyledIcon>
);

SaveIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export const ContainsIcon = () => (
  <Button startIcon={<SaveIcon color="#fff" />}>Click me</Button>
);

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
