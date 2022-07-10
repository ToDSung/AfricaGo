/**
 * @jest-environment jsdom
 */

import React from 'react';
import { act, create } from 'react-test-renderer';

import { fireEvent, render } from '@testing-library/react';

import RoomAllocation from '.';

test('should RoomAllocation render', () => {
  const component = create(
    <RoomAllocation
      guest={10}
      room={3}
      onChange={result => console.log(result)}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  act(() => {
    component.update(
      <RoomAllocation
        guest={3}
        room={3}
        onChange={result => console.log(result)}
      />
    );
  });

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should RoomAllocation calculate correctly', () => {
  const mockHandleChange = jest.fn();
  const { getAllByRole } = render(
    <RoomAllocation guest={10} room={3} onChange={mockHandleChange} />
  );

  const PlusNodes = getAllByRole(/Plus/i);
  const minusNodes = getAllByRole(/Minus/i);

  fireEvent.click(minusNodes[0]);
  expect(mockHandleChange).toHaveBeenCalledTimes(0);

  fireEvent.click(PlusNodes[0]);
  expect(mockHandleChange).toHaveBeenCalledTimes(1);
  expect(mockHandleChange).toHaveBeenCalledWith([
    {
      adult: 2,
      child: 0,
    },
    {
      adult: 1,
      child: 0,
    },
    {
      adult: 1,
      child: 0,
    },
  ]);

  fireEvent.click(minusNodes[0]);
  expect(mockHandleChange).toHaveBeenCalledTimes(2);
  expect(mockHandleChange).toHaveBeenCalledWith([
    {
      adult: 1,
      child: 0,
    },
    {
      adult: 1,
      child: 0,
    },
    {
      adult: 1,
      child: 0,
    },
  ]);

  [...Array(10)].forEach(() => {
    fireEvent.click(PlusNodes[0]);
  });
  expect(mockHandleChange).toHaveBeenCalledTimes(5);
  expect(mockHandleChange).toHaveBeenCalledWith([
    {
      adult: 4,
      child: 0,
    },
    {
      adult: 1,
      child: 0,
    },
    {
      adult: 1,
      child: 0,
    },
  ]);

  [...Array(10)].forEach(() => {
    fireEvent.click(PlusNodes[3]);
  });
  expect(mockHandleChange).toHaveBeenCalledTimes(8);
  expect(mockHandleChange).toHaveBeenCalledWith([
    {
      adult: 4,
      child: 0,
    },
    {
      adult: 1,
      child: 3,
    },
    {
      adult: 1,
      child: 0,
    },
  ]);

  [...Array(10)].forEach(() => {
    fireEvent.click(PlusNodes[5]);
  });
  expect(mockHandleChange).toHaveBeenCalledTimes(9);
  expect(mockHandleChange).toHaveBeenCalledWith([
    {
      adult: 4,
      child: 0,
    },
    {
      adult: 1,
      child: 3,
    },
    {
      adult: 1,
      child: 1,
    },
  ]);
});
