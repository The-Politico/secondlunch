import React from 'react';
import html2canvas from 'html2canvas';
import themes from '../themes.json';

class Form extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fontSize: 45,
      theme: 'theme1',
      aspectRatio: 'sixteen-by-nine',
      quotes: true,
      attribution: '',
    };

    this.onFontSizeChange = this.onFontSizeChange.bind(this);
    this.onThemeButtonClick = this.onThemeButtonClick.bind(this);
    this.onAspectRatioClick = this.onAspectRatioClick.bind(this);
    this.onQuoteButtonClick = this.onQuoteButtonClick.bind(this);
    this.onAttributionChange = this.onAttributionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFontSizeChange (e) {
    this.setState({
      fontSize: e.target.value,
    });
    setTimeout(() => {
      this.props.upstream(this.state);
    }, 0);
  }

  onThemeButtonClick (e) {
    this.setState({
      theme: e.target.id,
    });
    setTimeout(() => {
      this.props.upstream(this.state);
    }, 0);
  }

  onAspectRatioClick (e) {
    this.setState({
      aspectRatio: e.target.id,
    });
    setTimeout(() => {
      this.props.upstream(this.state);
    }, 0);
  }

  onQuoteButtonClick (e) {
    this.setState({
      quotes: e.target.id === 'show',
    });
    setTimeout(() => {
      this.props.upstream(this.state);
    }, 0);
  }

  onAttributionChange (e) {
    this.setState({
      attribution: e.target.value,
    });
    setTimeout(() => {
      this.props.upstream(this.state);
    }, 0);
  }

  convertToSlug (text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  onSubmit (e) {
    const canvas = document.querySelector('canvas')

    if (canvas) {
      canvas.parentNode.removeChild(canvas);
    }

    const poster = document.querySelector('.poster');
    const placeholders = poster
      .querySelector('span[contenteditable="false"]');

    if (placeholders) {
      placeholders.style.visibility = 'hidden';
    }

    html2canvas(poster).then((canvas) => {
      document.body.appendChild(canvas);
      window.oCanvas = document.getElementsByTagName('canvas');
      window.oCanvas = window.oCanvas[0];
      var strDataURI = window.oCanvas.toDataURL();

      var quote = document.querySelector('blockquote').textContent.split(' ', 5);
      var filename = this.convertToSlug(quote.join(' '));

      var a = document.createElement('a');
      a.setAttribute('href', strDataURI);
      a.setAttribute('download', 'quote-' + filename + '.png');
      document.body.appendChild(a);

      a.click();
      a.remove();

      const poster = document.querySelector('.poster');
      const placeholders = poster
        .querySelector('span[contenteditable="false"]');

      if (placeholders) {
        placeholders.style.visibility = 'visible';
      }
    });
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='form controls col-md-12'>
            <div className='controls-wrapper'>
              <div className='form-group'>
                <label htmlFor='fontsize'>Font size</label>
                <input
                  id='fontsize'
                  name='fontsize'
                  type='range'
                  min='24'
                  max='80'
                  value={this.state.fontSize}
                  onChange={this.onFontSizeChange}
                />
              </div>
              <div className='form-group btn-group-vertical'>
                <label htmlFor='theme'>Theme</label>
                <div id='theme' className='btn-group-vertical'>
                  {Object.keys(themes).map((theme) => (
                    <button
                      id={theme}
                      key={theme}
                      className={`theme-btn btn btn-primary ${this.state.theme === theme ? 'active' : null}`}
                      onClick={this.onThemeButtonClick}
                    >
                      {themes[theme].name}
                    </button>
                  ))}
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='aspect-ratio'>Aspect ratio</label>
                <div id='aspect-ratio' className='btn-group'>
                  <button
                    id='sixteen-by-nine'
                    className={`btn btn-primary ${this.state.aspectRatio === 'sixteen-by-nine' ? 'active' : null}`}
                    onClick={this.onAspectRatioClick}
                  >
                    16:9 <i className='icon icon-twitter' />
                  </button>
                  <button
                    id='square'
                    className={`btn btn-primary ${this.state.aspectRatio === 'square' ? 'active' : null}`}
                    onClick={this.onAspectRatioClick}
                  >
                    Square <i className='icon icon-instagram' />
                  </button>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='quote'>Quotation marks</label>
                <div id='quote' className='btn-group'>
                  <button
                    id='show'
                    className={`btn btn-primary ${this.state.quotes ? 'active' : null}`}
                    onClick={this.onQuoteButtonClick}
                  >
                    Show
                  </button>
                  <button
                    id='hide'
                    className={`btn btn-primary ${this.state.quotes ? null : 'active'}`}
                    onClick={this.onQuoteButtonClick}
                  >
                    Hide
                  </button>
                </div>
              </div>
              <div className='form-group'>
                <button
                  id='save'
                  className='btn btn-lg btn-primary'
                  onClick={this.onSubmit}
                >
                  Save image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
