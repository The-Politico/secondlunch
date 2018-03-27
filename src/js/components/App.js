import React from 'react';
import Poster from './Poster';
import Form from './Form';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fontSize: 45,
      theme: 'theme1',
      aspectRatio: 'sixteen-by-nine',
      quotes: 'true',
      attribution: '',
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState (downstream) {
    this.setState({
      fontSize: downstream.fontSize,
      theme: downstream.theme,
      aspectRatio: downstream.aspectRatio,
      quotes: downstream.quotes,
      attribution: downstream.attribution,
    });
  }

  render () {
    return (
      <div className='content'>
        <Poster
          fontSize={this.state.fontSize}
          theme={this.state.theme}
          aspectRatio={this.state.aspectRatio}
          quotes={this.state.quotes}
          attribution={this.state.attribution}
        />
        <Form upstream={this.updateState} />
      </div>
    );
  }
}

export default App;
