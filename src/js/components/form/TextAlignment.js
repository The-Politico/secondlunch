import React from 'react';

const TextAlignment = (props) => {
  return (
    <div className='form-group'>
      <label htmlFor='aspect-ratio'>Text alignment</label>
      <div id='aspect-ratio' className='btn-group'>
        <button
          id='left'
          className={`btn btn-primary ${props.value === 'left' ? 'active' : null}`}
          onClick={props.onChange}
        >
          Left
        </button>
        <button
          id='center'
          className={`btn btn-primary ${props.value === 'center' ? 'active' : null}`}
          onClick={props.onChange}
        >
          Center
        </button>
        <button
          id='right'
          className={`btn btn-primary ${props.value === 'right' ? 'active' : null}`}
          onClick={props.onChange}
        >
          Right
        </button>
      </div>
    </div>
  );
};

export default TextAlignment;
