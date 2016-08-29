import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import Icon from '../icon/icon';

class Folder extends Component {
  static propTypes = {
    appData: PropTypes.object.isRequired
  };

  renderIcons() {
    const {blogs} = this.props.appData;
    return blogs.map(blog => (
      <Icon
        iconId={blog.id}
        color={'#000000'}
        {...blog} />
    ))
  }

  render() {
    return (
      <Window {...this.props}>
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
