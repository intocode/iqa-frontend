import { render, screen } from '@testing-library/react';
import { Paper } from '.';
import '@testing-library/jest-dom';

const children = 'lorem ipsum';

const PaperTest = (props) => <Paper {...props} />;

describe('Paper', () => {
  it('should render the Paper', () => {
    const component = render(<PaperTest>{children}</PaperTest>);
    const { tagName } = component.container;
    expect(tagName.toLowerCase()).toEqual('div');
  });

  it('should render the Paper component', () => {
    render(<PaperTest>{children}</PaperTest>);
    expect(screen.getByText('lorem ipsum')).toBeInTheDocument();
  });
});
