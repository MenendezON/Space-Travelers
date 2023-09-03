import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Dragons from '../components/dragons';

// Mocking react-redux's useSelector
jest.mock('react-redux');

// Mocking axios
jest.mock('axios', () => ({
  get: jest.fn(),
}));

test('Missions component renders correctly', () => {
  // Mock the useSelector behavior
  useSelector.mockReturnValue([
    {
      id: 1, name: 'Dragon 1', type: 'Type 1', flickr_images: ['image1.jpg'], reserved: false,
    },
    {
      id: 2, name: 'Dragon 2', type: 'Type 2', flickr_images: ['image2.jpg'], reserved: true,
    },
    // Add more mission objects as needed
  ]);

  const { container } = render(<Dragons />);

  expect(container).toMatchSnapshot();
});
