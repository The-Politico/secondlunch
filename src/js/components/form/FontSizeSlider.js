import React from 'react';

const FontSizeSlider = (props) => {
  return (
    <div className='form-group'>
      <label htmlFor='fontsize'>Font size</label>
      <input
        id='fontsize'
        name='fontsize'
        type='range'
        min='24'
        max='80'
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default FontSizeSlider;