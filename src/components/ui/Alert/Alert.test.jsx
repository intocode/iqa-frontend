import { render, screen, fireEvent } from '@testing-library/react';
import { Alert as RealAlert } from '.';
import { AVAILABLE_THEME_COLORS } from '../../../app/constants';
import { theme } from '../../../app/theme';
import '@testing-library/jest-dom';

const Alert = (props) => <RealAlert theme={theme} {...props} />;

describe('colors', () => {
  it('have not close button when onClose os not passed', () => {
    render(<Alert>lorem ipsum</Alert>);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('runs onClose function when click on button', () => {
    const handleClose = jest.fn();

    render(<Alert onClose={handleClose}>lorem ipsum</Alert>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClose).toBeCalledTimes(1);
  });

  it('set correct bg colors', () => {
    const { rerender } = render(<Alert>alert</Alert>);

    expect(screen.getByText('alert')).toHaveStyle({
      'background-color': theme.colors.primary.addition,
    });

    AVAILABLE_THEME_COLORS.forEach((color) => {
      rerender(<Alert color={color}>alert</Alert>);
      expect(screen.getByText('alert')).toHaveStyle({
        'background-color': theme.colors[color].addition,
        color: theme.colors[color].main,
      });
    });
  });
});
