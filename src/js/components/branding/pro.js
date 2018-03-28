import React from 'react';

const Pro = (props) => {
  return (
    <div className='logo-wrapper' style={props.styles}>
      <b className='icon icon-politico' />
      &nbsp;
      <b className='icon icon-pro-small' style={{
        color: 'rgba(255,255,255,0.85)',
      }}/>
    </div>
  );
};

export default Pro;
