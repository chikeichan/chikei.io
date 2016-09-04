import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import ActionBar from './blog-action-bar';
import Markdown from '../markdown/markdown';

class Folder extends Component {
  static propTypes = {
    appData: PropTypes.object.isRequired
  };

  static defaultProps = {
    appData: {
      markdown: '',
      metadata: {
        title: '',
        author: '',
        date: '',
        avatar: ''
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
        <div className="blog-container">
          <div className="blog-content">
            <div className="blog-title">{title}</div>
            <hr/>
            <Markdown markdown={markdown} />
            <hr/>
            <div className="blog-author-wrapper">
              <img className="blog-author-avatar" src={avatar} />
              <div className="blog-meta">
                <span className="blog-author">{author}</span>
                <span className="blog-date">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </Window>
    );
  }
}

export default Folder;
