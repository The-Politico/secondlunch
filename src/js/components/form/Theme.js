import React from 'react';
import themes from '../../themes.json';

const Theme = (props) => {
  const classes = 'theme-btn btn btn-primary';

  return (
    <div className='form-group btn-group-vertical'>
      <label htmlFor='theme'>Theme</label>
      <div id='theme' className='btn-group-vertical'>
        {Object.keys(themes).map((theme) => (
          <button
            id={theme}
            key={theme}
            className={`${classes} ${props.value === theme ? 'active' : ''}`}
            onClick={props.onChange}
          >
            {themes[theme].name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Theme;