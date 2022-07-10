import { NumberValidator } from './validator';

test('should work', () => {
  const checkNumber = NumberValidator({ min: 0, max: 10 });

  expect(checkNumber(1)).toEqual(true);
  expect(checkNumber(-1)).toEqual(false);
  expect(checkNumber(11)).toEqual(false);
  expect(checkNumber('1')).toEqual(true);
  expect(checkNumber('v')).toEqual(false);
});
