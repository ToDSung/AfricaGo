import React, { useCallback, useState } from 'react';

import PropTypes from 'prop-types';

import Box from '../../components/Box';
import CustomInputNumber from '../../components/CustomInputNumber';
import { NumberValidator } from '../../utils/validator';
import RoomDescription from './RoomDescription';

const MIN_ROOM_ADULTS = 1;
const MIN_ROOM_CHILDREN = 0;
const MAX_ROOM_GUESTS = 4;
const STEP = 1;

const calcTotalAllowGuests = (source, guest) => {
  return source.reduce((accumulator, { adult, child }) => {
    return accumulator - adult - child;
  }, guest);
};

const checkRoomAllowGuests = NumberValidator({
  min: MIN_ROOM_ADULTS + MIN_ROOM_CHILDREN,
  max: MAX_ROOM_GUESTS,
});

const RoomAllocation = ({ guest, room, onChange = () => {} }) => {
  const [result, setResult] = useState(
    [...Array(room)].map(() => ({
      adult: MIN_ROOM_ADULTS,
      child: MIN_ROOM_CHILDREN,
    }))
  );

  const [allowGuests, setAllowGuests] = useState(
    calcTotalAllowGuests(result, guest)
  );

  const shouldDisabled = guest === room;

  const checkTotalAllowGuests = useCallback(
    newValue => {
      return NumberValidator({ min: 0, max: guest - room })(newValue);
    },
    [room, guest]
  );

  const handleChange = currentIndex => event => {
    const newResult = result.map((roomResult, index) => {
      if (index !== currentIndex) {
        return roomResult;
      }

      const newRoomResult = {
        ...roomResult,
        [event.target.name]: event.target.value,
      };

      const { adult, child } = newRoomResult;
      return checkRoomAllowGuests(adult + child) ? newRoomResult : roomResult;
    });

    const newTotalAllowGuests = calcTotalAllowGuests(newResult, guest);
    if (!checkTotalAllowGuests(newTotalAllowGuests)) {
      return;
    }

    setResult(newResult);
    setAllowGuests(newTotalAllowGuests);
    onChange(newResult);
  };

  return (
    <div className='w-96 p-2'>
      <h5>
        住家人數： {guest}人 / {room}房
      </h5>
      <Box
        className={`my-2 mr-4 h-10 text-gray-600 ${
          shouldDisabled ? 'border-gray-600' : 'border-amber-500'
        } `}
      >
        尚未分配人數: {allowGuests}人
      </Box>
      {result.map(({ adult, child }, index) => (
        <div key={`Room${index}`}>
          房間：{adult + child}人
          <div className='grid grid-cols-2'>
            <RoomDescription title='大人' subtitle='年齡 20+' />
            <CustomInputNumber
              min={MIN_ROOM_ADULTS}
              max={MAX_ROOM_GUESTS}
              step={STEP}
              name='adult'
              value={adult}
              disabled={shouldDisabled}
              disabledPlus={
                allowGuests === 0 || !checkRoomAllowGuests(adult + child + 1)
              }
              onChange={handleChange(index)}
            />
          </div>
          <div className='grid grid-cols-2'>
            <RoomDescription title='小孩' />
            <CustomInputNumber
              min={MIN_ROOM_CHILDREN}
              max={MAX_ROOM_GUESTS}
              step={STEP}
              name='child'
              value={child}
              disabled={shouldDisabled}
              disabledPlus={
                allowGuests === 0 || !checkRoomAllowGuests(adult + child + 1)
              }
              onChange={handleChange(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

RoomAllocation.propTypes = {
  guest: PropTypes.number.isRequired,
  room: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default RoomAllocation;
