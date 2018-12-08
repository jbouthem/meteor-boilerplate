import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader.jsx';

export default () => {
  return (
    <div>
      <PrivateHeader title='Dashboard'/>
      <div className='page-content'>
        Dashboard page content
      </div>
    </div>
  );
};
