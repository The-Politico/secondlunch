import React from 'react';
import Quote from './poster/quote';
import Source from './poster/source';
import Attribution from './poster/attribution';
import Plain from 'slate-plain-serializer';
// import quotes from '../quotes.json';
import themes from '../themes.json';
import assign from 'lodash/assign';
import plugins from '../slate-plugins';
import branding from './branding';

class Poster extends React.Component {
  constructor (props) {
    super(props);

    // const starter = quotes[Math.floor(Math.random() * quotes.length)];
    this.state = {
      quote: Plain.deserialize(''),
      source: Plain.deserialize(''),
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
      {}, theme.posterStyles, { fontSize: this.props.fontSize, }
    );
    const Brand = branding[theme.branding];

    return (
      <div className='poster-wrapper'>
        <div
          className={`poster ${this.props.aspectRatio} ${this.props.quotes ? 'quote' : ''}`}
          style={posterStyles}
        >
          {this.state.quote.startText.text ? (<span
            className='left-quote'
            style={theme.leftQuoteStyles}
          >&ldquo;</span>) : null}
          <Quote
            value={this.state.quote}
            onChange={this.onQuoteChange}
            plugins={plugins}
            styles={theme.quoteStyles}
          />
          <Source
            value={this.state.source}
            onChange={this.onSourceChange}
            plugins={plugins}
            styles={theme.sourceStyles}
          />
          <Attribution
            value={this.state.attribution}
            onChange={this.onAttributionChange}
            plugins={plugins}
            styles={assign({}, theme.attributionStyles, theme.sourceStyles, { opacity: 0.6, })}
            menuRef={this.menuRef}
          />
          {this.props.branding ? (
            <div className='logo-wrapper' style={theme.brandStyles}>
              <Brand />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Poster;
