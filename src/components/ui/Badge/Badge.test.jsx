import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Badge } from '.';
import { theme } from '../../../app/theme';
import { AVAILABLE_THEME_COLORS } from '../../../app/constants';

const children = 'lorem ipsum';

const BadgeTest = (props) => <Badge theme={theme} {...props} />;

describe('Badge', () => {
  it('should render the Badge component', () => {
    render(<BadgeTest>test</BadgeTest>);
  });

  it('should render the div to Badge', () => {
    const component = render(<BadgeTest>test</BadgeTest>);
    const tagName = component.container.localName;
    expect(tagName).toEqual('div');
  });

  it('should render the span to Badge', () => {
    const component = render(<BadgeTest content={3}>test</BadgeTest>);
    const tag = component.container.querySelector('span').localName;
    expect(tag).toEqual('span');
  });

  it('should render the children to Badge ', () => {
    render(<BadgeTest>{children}</BadgeTest>);
    expect(screen.getByText('lorem ipsum')).toBeInTheDocument();
  });

  it('should render the props.content to Badge', () => {
    const num = 3;
    const component = render(<BadgeTest content={num}>test</BadgeTest>);
    const tagProps = component.container.querySelector('span').getAttribute('content');
    expect(Number(tagProps)).toEqual(3);
  });

  it('set correct bg colors', () => {
    const component = render(<BadgeTest>test</BadgeTest>);
    const tagSpan = component.container.querySelector('span');
    expect(tagSpan).toHaveStyle({
      'background-color': theme.colors.primary.main,
    });

    AVAILABLE_THEME_COLORS.forEach((color) => {
      component.rerender(<BadgeTest color={color}>test</BadgeTest>);
      expect(tagSpan).toHaveStyle({
        'background-color': theme.colors[color].main,
      });
    });
  });
});
