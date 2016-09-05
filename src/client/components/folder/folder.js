import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import Icon from '../../containers/icon-container/blog-icon-container';
import FolderDetailItem from '../../containers/icon-container/folder-detail-item-container';
import ActionBar from './folder-action-bar';

class Folder extends Component {
  static propTypes = {
    appData: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    setViewMode: PropTypes.func.isRequired,
    viewMode: PropTypes.string
  };

  renderIcons() {
    const {blogs} = this.props.appData;
    return (
      <div className="folder-content">
        {blogs.map(blog => this.renderIcon(blog))}
      </div>
    );
  }

  renderIcon(blog) {
    return (
      <Icon
        iconId={blog.id}
        key={blog.id}
        color={'#000000'}
        {...blog} />
    );
  }

  renderDetails() {
    const {blogs} = this.props.appData;
    return (
      <table className="folder-detail-wrapper">
        <tbody>
          <tr>
            <th>Filename</th>
            <th>Author</th>
            <th>Date</th>
          </tr>
          {blogs.map(blog => this.renderDetail(blog))}
        </tbody>
      </table>
    );
  }

  renderDetail(blog) {
    return (
      <FolderDetailItem
        iconId={blog.id}
        key={blog.id}
        {...blog} />
    );
  }

  renderContent() {
    const {viewMode} = this.props;
    switch(viewMode) {
      case 'DETAIL':
        return this.renderDetails();
      case 'ICON':
      default:
        return this.renderIcons();
    }
  }

  render() {
    const {windowId, actions, setViewMode} = this.props;
    return (
      <Window {...this.props}>
        <ActionBar
          windowId={windowId}
          actions={actions}
          setViewMode={setViewMode} />
        <div className="folder-container">
          {this.renderContent()}
        </div>
      </Window>
    );
  }
}

export default Folder;
