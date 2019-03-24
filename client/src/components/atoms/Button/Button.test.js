import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

it('renders expected background color', async () => {
  const { getByText } = render(<Button bgColor="#C4C4C4" />);

  await waitForElement(() => getByText(/hello Satoshi/i));
});

