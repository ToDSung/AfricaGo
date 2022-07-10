import React, { useCallback, useRef } from 'react';

import PropTypes from 'prop-types';

import {
  BACKSPACE,
  DOWN_ARROW,
  ESC,
  KEY_CODES,
  NUMBER_KEY_CODES,
  UP_ARROW,
} from '../../constants/keycode';
import { NumberValidator } from '../../utils/validator';
import Box from '../Box';

const preventDefault = e => {
  e.preventDefault();
};

const CustomInputNumber = ({
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  name,
  value = 0,
  disabled = false,
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

  const checkNewValueValid = useCallback(
    newValue => {
      return NumberValidator({ min, max })(newValue);
    },
    [min, max]
  );

  const handleChange = newValue => {
    checkNewValueValid(newValue) &&
      onChange({
        target: {
          name,
          value: newValue,
        },
      });
  };

  const handleMinus = () => {
    focusNumberBoxRef();
    handleChange(+value - step);
  };

  const handlePlus = () => {
    focusNumberBoxRef();
    handleChange(+value + step);
  };

  const handleKeyDown = event => {
    focusNumberBoxRef();

    const { keyCode } = event;

    if (!(keyCode in KEY_CODES)) {
      return;
    }

    if ([DOWN_ARROW].includes(KEY_CODES[keyCode])) {
      return handleMinus();
    }

    if ([UP_ARROW].includes(KEY_CODES[keyCode])) {
      return handlePlus();
    }

    if (keyCode in NUMBER_KEY_CODES) {
      handleChange(+(`${value}` + `${KEY_CODES[keyCode]}`));
    }

    if (KEY_CODES[keyCode] === ESC) {
      blurNumberBoxRef();
    }

    if (KEY_CODES[keyCode] === BACKSPACE) {
      handleChange(+`${value}`.slice(0, -1));
    }
  };

  const handleBlur = () => {
    onBlur({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <div className='flex gap-2 p-2'>
      {disabled ? (
        <>
          <Box className='h-12 w-12 select-none border-gray-600 text-4xl text-gray-600 '>
            -
          </Box>
          <Box className='relative h-12 w-12 border-gray-600 outline-none '>
            {value}
          </Box>
          <Box className='h-12 w-12 select-none border-gray-600 text-4xl text-gray-600 '>
            +
          </Box>
        </>
      ) : (
        <>
          <Box
            onMouseDown={preventDefault} // to avoid focus this element
            onClick={handleMinus}
            className='h-12 w-12 cursor-pointer select-none  border-sky-600  text-4xl  text-sky-600'
          >
            -
          </Box>
          <Box
            ref={numberBoxRef}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className='relative h-12 w-12 border-sky-600  outline-none focus:border-2	'
            tabIndex={0}
          >
            {value}
          </Box>
          <Box
            onMouseDown={preventDefault}
            onClick={handlePlus}
            className='h-12 w-12 cursor-pointer select-none  border-sky-600 text-5xl text-sky-600	'
          >
            +
          </Box>
        </>
      )}
    </div>
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
