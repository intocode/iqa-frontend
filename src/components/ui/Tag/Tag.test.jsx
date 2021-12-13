import { screen, render, fireEvent } from '@testing-library/react';
import { Tag as RealTag } from '.';
import { theme } from '../../../app/theme';
import closeIcon from '../../assets/close.svg';
import '@testing-library/jest-dom';
import { AVAILABLE_THEME_COLORS } from '../../../app/constants';

const Tag = (props) => <RealTag theme={theme} {...props} />;

describe('Tag', () => {
  it('must render without error', () => {
    render(<Tag>Jest</Tag>);
  });

  it('must contain children props as tag text', () => {
    render(<Tag>Jest</Tag>);

    expect(screen.getByText('Jest')).toBeInTheDocument();
  });

  describe('close button', () => {
    it('button with image icon close appears when the onRemove props is passed', () => {
      const onRemove = jest.fn();

      render(<Tag onRemove={onRemove}>Jest</Tag>);

      const button = screen.getByRole('button');

      expect(button).toBeTruthy();

      expect(button.firstChild.nodeName.toLowerCase()).toEqual('img');

      expect(button.firstChild.getAttribute('src')).toEqual(closeIcon);
    });

    it('runs onRemove function when click on button', () => {
      const onRemove = jest.fn();

      render(<Tag onRemove={onRemove}>Jest</Tag>);

      fireEvent.click(screen.getByRole('button'));

      expect(onRemove).toBeCalledTimes(1);
    });
  });

  describe('colors', () => {
    it('set correct colors', () => {
      const { rerender } = render(<Tag color="primary">Jest</Tag>);

      expect(screen.getByText('Jest')).toHaveStyle({
        color: theme.colors.primary.main,
        'background-color': theme.colors.primary.addition,
        border: `1px solid ${theme.colors.primary.main}`,
      });

      AVAILABLE_THEME_COLORS.forEach((color) => {
        rerender(<Tag color={color}>Jest</Tag>);
        expect(screen.getByText('Jest')).toHaveStyle({
          color: theme.colors[color].main,
          'background-color': theme.colors[color].addition,
          border: `1px solid ${theme.colors[color].main}`,
        });
      });
    });
  });
});
