import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import ActionBar from '../window/window-action-bar';
import Markdown from '../markdown/markdown';

class Folder extends Component {
  static propTypes = {
    appData: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return this.props.appData.markdown !== nextProps.markdown;
  }

  render() {
    return (
      <Window {...this.props}>
        <ActionBar actions={this.props.actions} />
        <div className="blog-container">
          <div className="blog-content">
            <Markdown markdown={this.props.appData.markdown} />
          </div>
        </div>
      </Window>
    );
  }
}

export default Folder;
