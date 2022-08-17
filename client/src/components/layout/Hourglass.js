import React, { Fragment } from 'react';
import hourglass from './hourglass.gif';


//TODO*** NEED TO FIND A BETTER GIF FOR THIS...

const Hourglass = () => (
  <Fragment>
    <img
      src={hourglass}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </Fragment>
);

export default Hourglass;