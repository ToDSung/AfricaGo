import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';

const Box = forwardRef(function Box({ className, children, ...props }, ref) {
  return (
    <div
      className={`flex items-center justify-center rounded border text-base ${className}`}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  );
});

Box.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Box;
