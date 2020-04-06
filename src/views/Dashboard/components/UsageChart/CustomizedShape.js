import React from 'react';
import PropTypes from 'prop-types';

const getPath = (x, y, width, height) => `M${x - width / 2},${y}
          h${width}
          a${width / 4},${width / 4} 0 0 1 ${width / 4},${width / 4}
          v${height - width / 4}
          h${-width}
          v${-height + width / 4}
          a${width / 4},${width / 4} 0 0 1 ${width / 4},${-width / 4}
          z`;

const CustomizedShape = props => {
  const { x, y, width, height } = props;

  return (
    <React.Fragment>
      <defs>
        <linearGradient id="gradient1">
          <stop id="stop1" offset="0%" stopColor="#2BDA8E" stopOpacity={1} />
          <stop id="stop2" offset="100%" stopColor="#0AC4BA" stopOpacity={1} />
        </linearGradient>
        <linearGradient
          id="linear"
          x1="0"
          x2="0"
          y1="0"
          y2="1"
          xlinkHref="#gradient1"
        />
      </defs>
      <path
        d={getPath(x, y, width, height)}
        stroke="none"
        fill="url(#linear)"
      />
    </React.Fragment>
  );
};

CustomizedShape.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};

export default CustomizedShape;
