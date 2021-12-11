import { fireEvent, render, screen } from '@testing-library/react';
import { Rate as RealRate } from '.';
import { theme } from '../../../app/theme';
import '@testing-library/jest-dom';

const Rate = (props) => <RealRate theme={theme} {...props} />;

describe('Rate', () => {
  it('must render without error', () => {
    render(<Rate currentRate={0} />);
  });

  it('runs onUp function when click on button', () => {
    const onUp = jest.fn();

    render(<Rate currentRate={0} onUp={onUp} />);

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(onUp).toBeCalledTimes(1);
  });

  it('runs onDown function when click on button', () => {
    const onDown = jest.fn();

    render(<Rate currentRate={0} onDown={onDown} />);

    fireEvent.click(screen.getAllByRole('button')[1]);

    expect(onDown).toBeCalledTimes(1);
  });

  it('up arrow should be green when "isUpped" props passed', () => {
    render(<Rate currentRate={0} isUpped />);

    expect(screen.getAllByRole('button')[0].firstChild).toHaveStyle({
      fill: theme.colors.success.main,
    });
  });

  it('up arrow should be green when "isDowned" props passed', () => {
    render(<Rate currentRate={0} isDowned />);

    expect(screen.getAllByRole('button')[1].firstChild).toHaveStyle({
      fill: theme.colors.danger.main,
    });
  });

  describe('colors', () => {
    it('set the correct rating color if the rating value is 0 ', () => {
      render(<Rate currentRate={0} />);

      expect(screen.getByText('0')).toHaveStyle({
        color: theme.colors.gray.main,
      });
    });

    it('set the correct rating color if the rating value is greater than 0 ', () => {
      render(<Rate currentRate={1} />);

      expect(screen.getByText('1')).toHaveStyle({
        color: theme.colors.success.main,
      });
    });

    it('set the correct rating color if the rating value is less than 0 ', () => {
      render(<Rate currentRate={-1} />);

      expect(screen.getByText('-1')).toHaveStyle({
        color: theme.colors.danger.main,
      });
    });
  });
});
