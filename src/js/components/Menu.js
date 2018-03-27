import React from 'react';
import ReactDOM from 'react-dom';

class Menu extends React.Component {
  hasMark (type) {
    const { value, } = this.props;
    return value.activeMarks.some(mark => mark.type === type);
  }

  onClickMark (event, type) {
    const { value, onChange, } = this.props;
    event.preventDefault();
    const change = value.change().toggleMark(type);
    onChange(change);
  }

  renderMarkButton (type, icon) {
    const isActive = this.hasMark(type);
    const onMouseDown = event => this.onClickMark(event, type);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className='button' onMouseDown={onMouseDown} data-active={isActive}>
        <span className='material-icons'>{icon}</span>
      </span>
    );
  }

  render () {
    const root = window.document.getElementById('app');

    return ReactDOM.createPortal(
      <div className='menu hover-menu' ref={this.props.menuRef}>
        {this.renderMarkButton('italic', 'i')}
      </div>,
      root
    );
  }
}

export default Menu;
