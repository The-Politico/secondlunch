import React from 'react';
import Menu from '../menu';
import {Editor, } from 'slate-react';

const renderAttribution = (props) => {
  const { attributes, children, } = props;
  return (
    <p className='show-credit' {...attributes}>
      {children}
    </p>
  );
};

const renderMark = (props) => {
  const { children, mark, } = props;
  switch (mark.type) {
    case 'italic':
      return <em>{children}</em>;
  }
};

const Attribution = (props) => {
  return (
    <div className='attribution'>
      <Menu
        menuRef={props.menuRef}
        value={props.value}
        onChange={props.onChange}
      />
      <Editor
        value={props.value}
        onChange={props.onChange}
        renderNode={renderAttribution}
        renderMark={renderMark}
        placeholder='Enter attribution here (optional)'
        style={props.styles}
      />
    </div>
  );
};

export default Attribution;
