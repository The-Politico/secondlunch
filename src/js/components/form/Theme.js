import React from 'react';
import themes from '../../themes.json';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Theme = (props) => {
  const options = Object.keys(themes);

  return (
    <div className='form-group'>
      <label htmlFor='theme'>Theme</label>
      <div id='theme'>
        <Dropdown
          options={options}
          onChange={props.onChange}
          value={props.value}
          placeholder='Select a theme'
        />
      </div>
    </div>
  );
};

export default Theme;
