export const LEFT_ARROW = 'LeftArrow';
export const UP_ARROW = 'UpArrow';
export const RIGHT_ARROW = 'RightArrow';
export const DOWN_ARROW = 'DownArrow';

export const BACKSPACE = 'BACKSPACE';
export const DELETE = 'DELETE';
export const ESC = 'ESC';

export const ARROW_KEY_CODES = {
  37: LEFT_ARROW,
  38: UP_ARROW,
  39: RIGHT_ARROW,
  40: DOWN_ARROW,
};

export const NUMBER_KEY_CODES = {
  48: 0,
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
  96: 0,
  97: 1,
  98: 2,
  99: 3,
  100: 4,
  101: 5,
  102: 6,
  103: 7,
  104: 8,
  105: 9,
};

export const KEY_CODES = {
  ...ARROW_KEY_CODES,
  ...NUMBER_KEY_CODES,
  8: BACKSPACE,
  46: DELETE,
  27: ESC,
};

export default KEY_CODES;
