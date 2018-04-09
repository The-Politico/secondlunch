import React from 'react';
import {Editor, } from 'slate-react';

const renderQuote = (props) => {
  const { attributes, children, } = props;

  return (
    <p {...attributes}>{children}</p>
  );
};

const onKeyDown = (event, change, editor) => {
  if (change.value.startText.text.startsWith('"')) {
    change
      .selectAll()
      .moveOffsetsTo(0, 1)
      .deleteForward(1)
      .insertText('\u201c');
  }
}

const Quote = (props) => {
  let classes = '';
  if (props.value.startText.text.length <= 0) {
    classes = 'empty';
  }

  return (
    <blockquote className={classes} style={props.styles}>
      <Editor
        value={props.value}
        onChange={props.onChange}
        placeholder='Enter quote here'
        plugins={props.plugins}
        renderNode={renderQuote}
        onKeyDown={onKeyDown}
      />
    </blockquote>
  );
};

export default Quote;
