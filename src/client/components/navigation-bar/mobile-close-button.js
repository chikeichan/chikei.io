import React, {Component, PropTypes} from 'react';

class MobileCloseButton extends Component {
  static propTypes = {
    closeWindow: PropTypes.func.isRequired
  };

  closeWindow = () => {
    const {closeWindow, id} = this.props;
    return id && closeWindow(id);
  }

  render() {
    const {id} = this.props;
    return (
      <div
        className="mobile-close-button"
        style={{opacity: id ? 0.8 : 0}}
        onClick={this.closeWindow} />
    );
  }
}

export default MobileCloseButton;
