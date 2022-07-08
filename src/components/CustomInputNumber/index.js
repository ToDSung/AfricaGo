import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import {
  BACKSPACE,
  DOWN_ARROW,
  ESC,
  KEY_CODES,
  LEFT_ARROW,
  NUMBER_KEY_CODES,
  RIGHT_ARROW,
  UP_ARROW,
} from '../../constants/keycode';
import Box from '../Box';

const CustomInputNumber = ({
  // min = 0,
  // max = Number.MAX_SAFE_INTEGER,
  step = 1,
  name,
  value = 0,
  // disabled = false,
  onChange = () => {},
  onBlur = () => {},
}) => {
  const numberBoxRef = useRef(null);

  const focusNumberBoxRef = () => {
    numberBoxRef.current.focus();
  };
  const blurNumberBoxRef = () => {
    numberBoxRef.current.blur();
  };

  const handleMinus = () => {
    focusNumberBoxRef();
    onChange({
      target: {
        name,
        value: +value - step,
      },
    });
  };

  const handlePlus = () => {
    focusNumberBoxRef();
    onChange({
      target: {
        name,
        value: +value + step,
      },
    });
  };

  const handleKeyDown = event => {
    focusNumberBoxRef();

    const { keyCode } = event;

    if (!(keyCode in KEY_CODES)) {
      return;
    }

    if ([DOWN_ARROW, LEFT_ARROW].includes(KEY_CODES[keyCode])) {
      return handleMinus();
    }

    if ([UP_ARROW, RIGHT_ARROW].includes(KEY_CODES[keyCode])) {
      return handlePlus();
    }

    if (keyCode in NUMBER_KEY_CODES) {
      onChange({
        target: {
          name,
          value: +(`${value}` + `${KEY_CODES[keyCode]}`),
        },
      });
    }

    if (KEY_CODES[keyCode] === ESC) {
      blurNumberBoxRef();
      handleBlur(event);
    }

    if (KEY_CODES[keyCode] === BACKSPACE) {
      onChange({
        target: {
          name,
          value: +`${value}`.slice(0, -1),
        },
      });
    }
  };

  const handleBlur = event => {
    onBlur(event);
  };

  return (
    <>
      <div className='flex gap-2 p-2'>
        <Box
          onClick={handleMinus}
          className='cursor-pointer select-none border-sky-600 text-4xl text-sky-600	'
        >
          -
        </Box>
        <Box
          ref={numberBoxRef}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className='relative border-sky-600 outline-none focus:border-2	'
          tabIndex={0}
        >
          {value}
        </Box>
        <Box
          onClick={handlePlus}
          className='cursor-pointer select-none border-sky-600 text-5xl text-sky-600	'
        >
          +
        </Box>
      </div>
    </>
  );
};

CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default CustomInputNumber;
