import React, { useState } from 'react';

import CustomInputNumber from '../../components/CustomInputNumber';

const RoomAllocation = () => {
  const [value, setValue] = useState(0);

  const handleChange = event => {
    console.log(event.target);
    setValue(event.target.value);
  };

  const handleBlur = event => {
    console.log(event.target);
    console.log(event.target.value);
  };

  return (
    <>
      <CustomInputNumber
        min={0}
        max={4}
        name='CustomInputNumber'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
};

export default RoomAllocation;
