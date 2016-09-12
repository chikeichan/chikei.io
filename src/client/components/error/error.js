import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';

class ErrorDialog extends Component {
  static propTypes = {
    appData: PropTypes.object.isRequired,
    windowId: PropTypes.string.isRequired,
    closeWindow: PropTypes.func.isRequired
  };

  static defaultProps = {
    appData: {
      errorMessage: 'Uh oh... Something went wrong'
    }
  };

  shouldComponentUpdate(nextProps) {
    return this.props.appData.errorMessage !== nextProps.errorMessage;
  }

  componentWillMount() {
    if (typeof Audio === 'undefined') {
      return;
    }

    const startup = new Audio('/sounds/error.wav');
    startup.play();
  }

  render() {
    const {appData, closeWindow, windowId} = this.props;
    const {errorMessage} = appData;

    return (
      <Window {...this.props}>
        <div className="error-dialog">
          <div className="error-content__wrapper">
            <div className="error-dialog__icon" />
            {errorMessage}
          </div>
          <button
            className="error-dialog__button"
            onClick={() => closeWindow(windowId)}>
            OK
          </button>
        </div>
      </Window>
    );
  }
}

export default ErrorDialog;
