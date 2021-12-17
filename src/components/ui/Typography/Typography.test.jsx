import { render, screen } from '@testing-library/react';
import { Typography as RealTypography } from '.';
import { theme } from '../../../app/theme';
import '@testing-library/jest-dom';
import { AVAILABLE_THEME_COLORS } from '../../../app/constants';

const styleFont = {
  fonts: {
    header: {
      size: '24px',
      weight: 500,
    },
    caption: {
      size: '16px',
      weight: 500,
    },
    small: {
      size: '12px',
      weight: 400,
    },
    extraSmall: {
      size: '9px',
      weight: 400,
    },
  },
};

const AVAILABLE_VARIANT_FONTS = Object.keys(styleFont.fonts);

const Typography = (props) => <RealTypography theme={theme} {...props} />;

describe('Typography', () => {
  it('must render without error', () => {
    render(<Typography>Typography Text</Typography>);
  });

  it('must contain children props as button text', () => {
    render(<Typography>Typography Text</Typography>);

    expect(screen.getByText('Typography Text')).toBeInTheDocument();
  });

  describe('variants Typography', () => {
    it('set correct variants', () => {
      const { rerender } = render(<Typography>Typography Text</Typography>);

      expect(screen.getByText('Typography Text')).toHaveStyle({
        'font-size': styleFont.fonts.caption.size,
        'font-weight': styleFont.fonts.caption.weight,
      });

      AVAILABLE_VARIANT_FONTS.forEach((font) => {
        rerender(<Typography variant={font}>Typography Text</Typography>);

        expect(screen.getByText('Typography Text')).toHaveStyle({
          'font-size': styleFont.fonts[font].size,
          'font-weight': styleFont.fonts[font].weight,
        });
      });
    });
  });

  describe('colors', () => {
    it('set correct colors', () => {
      const { rerender } = render(<Typography>Typography Text</Typography>);

      expect(screen.getByText('Typography Text')).toHaveStyle({
        color: theme.colors.primary.main,
      });

      AVAILABLE_THEME_COLORS.forEach((color) => {
        rerender(<Typography color={color}>Typography Text</Typography>);

        expect(screen.getByText('Typography Text')).toHaveStyle({
          color: theme.colors[color].main,
        });
      });
    });
  });
});
