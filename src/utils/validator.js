export const NumberValidator =
  ({ min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER }) =>
  newValue => {
    const isValueNaN = isNaN(Number(newValue));
    const isValueOutOfRange = newValue < min || newValue > max;

    return !isValueNaN && !isValueOutOfRange;
  };
