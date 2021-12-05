import { screen, render } from '@testing-library/react';
import { Button as RealButton } from '.';
import { theme } from '../../../app/theme';
import '@testing-library/jest-dom';
import { AVAILABLE_THEME_COLORS } from '../../../app/constants';

// my solution for https://github.com/styled-components/jest-styled-components/issues/61
const Button = (props) => <RealButton theme={theme} {...props} />;

describe('Button', () => {
  it('must render without error', () => {
    render(<Button>Click me</Button>);
  });

  it('must contain children props as button text', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('disabled button when `loading` props passed', () => {
    render(<Button loading>btn</Button>);

    expect(screen.getByText('btn')).toBeDisabled();
  });

  it('disabled button when `disabled` props passed', () => {
    render(<Button disabled>btn</Button>);

    expect(screen.getByText('btn')).toBeDisabled();
  });

  describe('colors', () => {
    it('set correct bg colors', () => {
      const { rerender } = render(<Button>btn</Button>);

      expect(screen.getByText('btn')).toHaveStyle({
        'background-color': theme.colors.primary.main,
      });

      AVAILABLE_THEME_COLORS.forEach((color) => {
        rerender(<Button color={color}>btn</Button>);
        expect(screen.getByText('btn')).toHaveStyle({
          'background-color': theme.colors[color].main,
          color: theme.colors[color].text,
        });
      });
    });
  });
});
