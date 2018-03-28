import React from 'react';

const AspectRatio = (props) => {
  return (
    <div className='form-group'>
      <label htmlFor='aspect-ratio'>Aspect ratio</label>
      <div id='aspect-ratio' className='btn-group'>
        <button
          id='sixteen-by-nine'
          className={`btn btn-primary ${props.value === 'sixteen-by-nine' ? 'active' : null}`}
          onClick={props.onChange}
        >
          16:9 <i className='icon icon-twitter' />
        </button>
        <button
          id='square'
          className={`btn btn-primary ${props.value === 'square' ? 'active' : null}`}
          onClick={props.onChange}
        >
          Square <i className='icon icon-instagram' />
        </button>
      </div>
    </div>
  );
};

export default AspectRatio;
