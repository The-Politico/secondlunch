import React from 'react';

const QuotationMarks = (props) => {
  return (
    <div className='form-group'>
      <label htmlFor='branding'>Branding</label>
      <div id='branding' className='btn-group'>
        <button
          id='show'
          className={`btn btn-primary ${props.value ? 'active' : null}`}
          onClick={props.onChange}
        >
          Show
        </button>
        <button
          id='hide'
          className={`btn btn-primary ${props.value ? null : 'active'}`}
          onClick={props.onChange}
        >
          Hide
        </button>
      </div>
    </div>
  );
};

export default QuotationMarks;
