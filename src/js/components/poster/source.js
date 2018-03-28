import React from 'react';
import {Editor, } from 'slate-react';

const renderSource = (props) => {
  const { attributes, children, } = props;
  return (
    <p className='source' {...attributes}>
      {children[0].props.block ? '\u2014' : null} {children}
    </p>
  );
};

const Source = (props) => {
  return (
    <Editor
      value={props.value}
      onChange={props.onChange}
      placeholder='Enter source here (optional)'
      renderNode={renderSource}
      style={props.styles}
      plugins={props.plugins}
    />
  );
};

export default Source;
