import React, { useState } from 'react';

import CustomInputNumber from '../../components/CustomInputNumber';

const RoomAllocation = () => {
  const [value, setValue] = useState(0);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleBlur = event => {
    console.log(event);
  };

  return (
    <CustomInputNumber
      min={0}
      max={4}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default RoomAllocation;
