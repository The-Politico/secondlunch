import React from 'react';
import html2canvas from 'html2canvas';
import FontSizeSlider from './form/FontSizeSlider';
import Theme from './form/Theme';
import AspectRatio from './form/AspectRatio';
import QuotationMarks from './form/QuotationMarks';

class Form extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fontSize: 40,
      theme: 'POLITICO Red',
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
    this.saveImage = this.saveImage.bind(this);
  }

  onFontSizeChange (e) {
    this.setState({ fontSize: e.target.value, });
    this.sendUpstream();
  }

  onThemeButtonClick ({ value, label, }) {
    this.setState({ theme: value, });
    this.sendUpstream();
  }

  onAspectRatioClick (e) {
    this.setState({ aspectRatio: e.target.id, });
    this.sendUpstream();
  }

  onQuoteButtonClick (e) {
    this.setState({ quotes: e.target.id === 'show', });
    this.sendUpstream();
  }

  onAttributionChange (e) {
    this.setState({ attribution: e.target.value, });
    this.sendUpstream();
  }

  sendUpstream () {
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
    const canvas = document.querySelector('canvas');

    if (canvas) {
      canvas.parentNode.removeChild(canvas);
    }

    const poster = document.querySelector('.poster');
    const placeholders = poster
      .querySelector('span[contenteditable="false"]');

    if (placeholders) {
      placeholders.style.visibility = 'hidden';
    }

    html2canvas(poster).then(this.saveImage);
  }

  saveImage (canvas) {
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
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='form controls col-md-12'>
            <div className='controls-wrapper'>
              <FontSizeSlider
                value={this.state.fontSize}
                onChange={this.onFontSizeChange}
              />
              <Theme
                value={this.state.theme}
                onChange={this.onThemeButtonClick}
              />
              <AspectRatio
                value={this.state.aspectRatio}
                onChange={this.onAspectRatioClick}
              />
              <QuotationMarks
                value={this.state.quotes}
                onChange={this.onQuoteButtonClick}
              />
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
