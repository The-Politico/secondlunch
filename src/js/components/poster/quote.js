import React from 'react';
import {Editor, } from 'slate-react';

const renderQuote = (props) => {
  const { attributes, children, } = props;

  return (
    <p {...attributes}>{children}</p>
  );
};

const Quote = (props) => {
  return (
    <blockquote style={props.styles}>
      <Editor
        value={props.value}
        onChange={props.onChange}
        placeholder='Enter quote here'
        plugins={props.plugins}
        renderNode={renderQuote}
      />
    </blockquote>
  );
};

export default Quote;
