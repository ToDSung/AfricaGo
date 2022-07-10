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
  disabledMinus = false,
  disabledPlus = false,
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

  const shouldDisableMinus = disabled || disabledMinus || value === min;
  const shouldDisablePlus = disabled || disabledPlus || value === max;

  return (
    <div className='flex gap-2 p-2'>
      <>
        <Box
          role='minus'
          {...(!shouldDisableMinus && {
            onMouseDown: preventDefault, // to avoid focus this element
            onClick: handleMinus,
          })}
          className={`h-12 w-12  select-none text-4xl ${
            shouldDisableMinus
              ? 'border-gray-600 text-gray-600'
              : 'cursor-pointer  border-sky-600 text-sky-600'
          }`}
        >
          -
        </Box>
        <Box
          {...(!disabled && {
            ref: numberBoxRef,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            tabIndex: 0,
          })}
          className={`
              relative h-12 w-12 outline-none 
              ${
                disabled
                  ? 'border-gray-600 text-gray-600'
                  : 'border-sky-600 focus:border-2'
              }
            `}
        >
          {value}
        </Box>
        <Box
          role='plus'
          {...(!shouldDisablePlus && {
            onMouseDown: preventDefault,
            onClick: handlePlus,
          })}
          className={`h-12 w-12  select-none  text-4xl  ${
            shouldDisablePlus
              ? 'border-gray-600 text-gray-600'
              : ' cursor-pointer border-sky-600  text-sky-600'
          }`}
        >
          +
        </Box>
      </>
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
  disabledMinus: PropTypes.bool,
  disabledPlus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default CustomInputNumber;
