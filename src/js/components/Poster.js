import React from 'react';
import {Editor,} from 'slate-react';
import Menu from './Menu';
import Plain from 'slate-plain-serializer';
import AutoReplace from 'slate-auto-replace';
import quotes from '../quotes.json';
import themes from '../themes.json';
import assign from 'lodash/assign';

const starter = quotes[Math.floor(Math.random() * quotes.length)];
const plugins = [
  AutoReplace({
    trigger: /(")/,
    before: /\s$/,
    transform: (transform, event, matches) => {
      return transform.insertText('“'); // smart double quote (left)
    },
  }),
  AutoReplace({
    trigger: /(")/,
    before: /\S$/,
    transform: (transform, event, matches) => {
      return transform.insertText('\u201d'); // smart double quote (right)
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /\s$/,
    transform: (transform, event, matches) => {
      return transform.insertText('\u2018'); // smart single quote (left)
    },
  }),
  AutoReplace({
    trigger: /(')/,
    before: /\S$/,
    transform: (transform, event, matches) => {
      return transform.insertText('\u2019'); // smart single quote (right)
    },
  }),
];

const renderQuote = (props) => {
  const { node, attributes, children } = props;

  return (
    <p {...attributes}>{children}</p>
  );
};

const renderSource = (props) => {
  const { node, attributes, children } = props;
  return (
    <p className='source' {...attributes}>
      {children[0].props.block ? '\u2014' : null} {children}
    </p>
  );
};

const renderAttribution = (props) => {
  const { node, attributes, children } = props;
  return (
    <p className='show-credit' {...attributes}>
      {children}
    </p>
  );
};

const renderMark = (props) => {
  const { children, mark } = props;
  console.log(mark.type);
  switch (mark.type) {
    case 'italic':
      return <em>{children}</em>;
  }
};

class Poster extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      quote: Plain.deserialize(starter.quote),
      source: Plain.deserialize(starter.source),
      attribution: Plain.deserialize(''),
    };
    this.onQuoteChange = this.onQuoteChange.bind(this);
    this.onSourceChange = this.onSourceChange.bind(this);
    this.onAttributionChange = this.onAttributionChange.bind(this);
    this.menuRef = this.menuRef.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
  }

  onQuoteChange ({ value, }) {
    this.setState({
      quote: value,
    });
  }

  onSourceChange ({ value, }) {
    this.setState({
      source: value,
    });
  }

  onAttributionChange ({ value, }) {
    this.setState({
      attribution: value,
    });
  }

  menuRef (menu) {
    this.menu = menu;
  }

  componentDidMount () {
    this.updateMenu();
  }

  componentDidUpdate () {
    this.updateMenu();
  }

  updateMenu () {
    const { attribution, } = this.state;
    const menu = this.menu;
    if (!menu) return;

    if (attribution.isBlurred || attribution.isEmpty) {
      menu.removeAttribute('style');
      return;
    }

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.position = 'absolute';
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`;
  }

  render () {
    const theme = themes[this.props.theme];
    const posterStyles = assign(
      {}, theme.posterStyles, {fontSize: this.props.fontSize}
    );

    return (
      <div className='poster-wrapper'>
        <div
          className={`poster ${this.props.aspectRatio} ${this.props.quotes ? 'quote' : null}`}
          style={posterStyles}
        >
          <span className='left-quote' style={theme.leftQuoteStyles}>&ldquo;</span>
          <blockquote>
            <Editor
              value={this.state.quote}
              onChange={this.onQuoteChange}
              placeholder='Enter quote here'
              plugins={plugins}
              renderNode={renderQuote}
            />
          </blockquote>
          <Editor
            value={this.state.source}
            onChange={this.onSourceChange}
            renderNode={renderSource}
            placeholder='Enter source here (optional)'
            style={theme.sourceStyles}
          />
          <div className='attribution'>
            <Menu
              menuRef={this.menuRef}
              value={this.state.attribution}
              onChange={this.onAttributionChange}
            />
            <Editor
              value={this.state.attribution}
              onChange={this.onAttributionChange}
              renderNode={renderAttribution}
              renderMark={renderMark}
              placeholder='Enter attribution here (optional)'
              style={assign({}, theme.attributionStyles, {opacity: 0.6,})}
            />
          </div>
          <b className='logo-wrapper'>
            <b
              className={`icon ${theme.iconClass}`}
              style={{
                color: theme.iconColor,
              }}
            />
            &nbsp;
            {theme.extraIconClass ? (
              <b
                className={`icon ${theme.extraIconClass}`}
                style={{
                  color: theme.extraIconColor,
                }}
              />
            ) : null}
          </b>
        </div>
      </div>
    );
  }
}

export default Poster;
