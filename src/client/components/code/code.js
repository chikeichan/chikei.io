import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import ActionBar from './code-action-bar';
import Markdown from '../markdown/markdown';

class Code extends Component {
  static propTypes = {
    appData: PropTypes.object.isRequired
  };

  static defaultProps = {
    appData: {
      markdown: '',
      metadata: {
        title: ''
      }
    }
  };

  shouldComponentUpdate(nextProps) {
    return this.props.appData.markdown !== nextProps.markdown;
  }

  render() {
    const {appData, actions} = this.props;
    const {metadata, markdown} = appData;
    const {title, author, date, avatar} = metadata;

    return (
      <Window {...this.props}>
        <ActionBar actions={actions} />
        <div className="code-container">
          <div className="code-content">
            <Markdown
              className="code-markdown"
              markdown={markdown} />
          </div>
        </div>
      </Window>
    );
  }
}

export default Code;
