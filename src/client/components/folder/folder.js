import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import Icon from '../../containers/icon-container/blog-icon-container';
import ActionBar from './folder-action-bar';

class Folder extends Component {
  static propTypes = {
    appData: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired
  };

  renderIcons() {
    const {blogs} = this.props.appData;
    return blogs.map(blog => (
      <Icon
        iconId={blog.id}
        key={blog.id}
        color={'#000000'}
        {...blog} />
    ))
  }

  render() {
    return (
      <Window {...this.props}>
        <ActionBar actions={this.props.actions} />
        <div className="folder-container">
          <div className="folder-content">
            {this.renderIcons()}
          </div>
        </div>
      </Window>
    );
  }
}

export default Folder;
