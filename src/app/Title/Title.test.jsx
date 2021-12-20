import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Title } from './Title';

describe('Title', () => {
  it('must renders without crash and return null', async () => {
    const { container } = render(<Title />);
    expect(container).toBeEmptyDOMElement();
  });

  it('must add title tag to document', async () => {
    const title = 'lorem ipsum';
    const { container } = render(<Title>{title}</Title>);
    await waitFor(() => expect(document.head.title).toBeDefined());
    expect(document.querySelector('title').textContent).toBe(title);
    expect(container).toBeEmptyDOMElement();
  });
});
