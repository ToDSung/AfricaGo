/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';

import { render } from '@testing-library/react';

import Box from '.';

test('should Box render', () => {
  const component = renderer.create(
    <Box>
      <div>box content!</div>
    </Box>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should Box Content render', () => {
  const { queryByText } = render(
    <Box>
      <div>box content!</div>
    </Box>
  );

  expect(queryByText(/box content/i)).toBeTruthy();
});
