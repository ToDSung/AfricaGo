import React from 'react';

import PropTypes from 'prop-types';

const RoomDescription = ({ title = 'title', subtitle = '' }) => (
  <div className='my-2 flex flex-col'>
    <span>{title} </span>
    <span className='text-gray-400'>{subtitle}</span>
  </div>
);

RoomDescription.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default RoomDescription;
