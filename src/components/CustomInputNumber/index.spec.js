/**
 * @jest-environment jsdom
 */

import React from 'react';
import { act, create } from 'react-test-renderer';

import { fireEvent, render } from '@testing-library/react';

import CustomInputNumber from '.';

test('should CustomInputNumber render disabled', () => {
  const mockHandleChange = () => jest.fn();

  const component = create(
    <CustomInputNumber
      min={0}
      max={4}
      step={1}
      name='test'
      value={2}
      disabled={true}
      onChange={mockHandleChange(0)}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  act(() => {
    component.update(
      <CustomInputNumber
        min={0}
        max={4}
        step={1}
        name='test'
        value={3}
        disabled={true}
        onChange={mockHandleChange(0)}
      />
    );
  });

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should CustomInputNumber render active', () => {
  const mockHandleChange = () => jest.fn();

  const component = create(
    <CustomInputNumber
      min={0}
      max={4}
      step={1}
      name='test'
      value={2}
      disabled={false}
      onChange={mockHandleChange(0)}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  act(() => {
    component.update(
      <CustomInputNumber
        min={0}
        max={4}
        step={1}
        name='test'
        value={3}
        disabled={false}
        onChange={mockHandleChange(0)}
      />
    );
  });

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should CustomInputNumber Content disabled', () => {
  const mockHandleChange = jest.fn();

  const { queryByText } = render(
    <CustomInputNumber
      min={0}
      max={4}
      step={1}
      name='test'
      value={2}
      disabled={true}
      onChange={mockHandleChange}
    />
  );

  fireEvent.click(queryByText(/-/i));
  expect(mockHandleChange).toHaveBeenCalledTimes(0);
  fireEvent.click(queryByText(/\+/i));
  expect(mockHandleChange).toHaveBeenCalledTimes(0);
});

test('should CustomInputNumber Content active', () => {
  const mockHandleChange = jest.fn();

  const { queryByText } = render(
    <CustomInputNumber
      min={0}
      max={4}
      step={1}
      name='test'
      value={2}
      disabled={false}
      onChange={mockHandleChange}
    />
  );

  fireEvent.click(queryByText(/-/i));
  expect(mockHandleChange).toHaveBeenCalledTimes(1);
  expect(mockHandleChange).toHaveBeenCalledWith({
    target: {
      name: 'test',
      value: 1,
    },
  });

  fireEvent.click(queryByText(/\+/i));
  expect(mockHandleChange).toHaveBeenCalledTimes(2);
  expect(mockHandleChange).toHaveBeenCalledWith({
    target: {
      name: 'test',
      value: 3,
    },
  });
});

test('should CustomInputNumber disable plus feature', () => {
  const mockHandleChange = jest.fn();

  const { queryByText } = render(
    <CustomInputNumber
      min={0}
      max={4}
      step={1}
      name='test'
      value={4}
      disabled={false}
      onChange={mockHandleChange}
    />
  );

  fireEvent.click(queryByText(/\+/i));
  expect(mockHandleChange).toHaveBeenCalledTimes(0);
});

test('should CustomInputNumber disable minus feature', () => {
  const mockHandleChange = jest.fn();

  const { queryByText } = render(
    <CustomInputNumber
      min={0}
      max={4}
      step={1}
      name='test'
      value={0}
      disabled={false}
      onChange={mockHandleChange}
    />
  );

  fireEvent.click(queryByText(/-/i));
  expect(mockHandleChange).toHaveBeenCalledTimes(0);
});

test('should CustomInputNumber step props working', () => {
  const mockHandleChange = jest.fn();

  const { queryByText } = render(
    <CustomInputNumber
      min={0}
      max={4}
      step={2}
      name='test'
      value={4}
      disabled={false}
      onChange={mockHandleChange}
    />
  );

  fireEvent.click(queryByText(/-/i));
  expect(mockHandleChange).toHaveBeenCalledTimes(1);
  expect(mockHandleChange).toHaveBeenCalledWith({
    target: {
      name: 'test',
      value: 2,
    },
  });
});

test('should CustomInputNumber onBlur', () => {
  const mockOnblur = jest.fn();

  const { queryByText } = render(
    <CustomInputNumber
      min={0}
      max={4}
      step={2}
      name='test'
      value={2}
      disabled={false}
      onChange={() => {}}
      onBlur={mockOnblur}
    />
  );

  const valueNode = queryByText(/2/i);
  fireEvent.focus(valueNode);
  expect(mockOnblur).toHaveBeenCalledTimes(0);
  fireEvent.focusOut(valueNode);
  expect(mockOnblur).toHaveBeenCalledWith({
    target: {
      name: 'test',
      value: 2,
    },
  });
});
