import { screen, render, fireEvent } from '@testing-library/react';
import { Tag as RealTag } from '.';
import { theme } from '../../../app/theme';
import '@testing-library/jest-dom';

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

      expect(button.firstChild.nodeName.toLowerCase()).toEqual('svg');

      // expect(button.firstChild.getAttribute('src')).toEqual(closeIcon);
    });

    it('runs onRemove function when click on button', () => {
      const onRemove = jest.fn();

      render(<Tag onRemove={onRemove}>Jest</Tag>);

      fireEvent.click(screen.getByRole('button'));

      expect(onRemove).toBeCalledTimes(1);
    });
  });
});
