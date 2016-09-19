import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import Icon from '../../containers/icon-container/blog-icon-container';
import ActionBar from './folder-action-bar';

class FolderDetailItem extends Component {
  static propTypes = {
    iconId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    openBlog: PropTypes.func.isRequired,
    selectIcon: PropTypes.func.isRequired,
    isSelected: PropTypes.bool
  };

  static defaultProps = {
    isSelected: false
  };

  render() {
    const {
      author, date, name, openBlog, type,
      selectIcon, iconId, isSelected
    } = this.props;

    return (
      <tr
        className={isSelected && 'folder-detail__selected'}
        onClick={e => e.stopPropagation()}
        onDoubleClick={() => openBlog(iconId)}
        onMouseDown={() => selectIcon(iconId)}>
        <td>
          <span className={`folder-detail-item-icon icon-image__${type}`} />
          {name}
        </td>
        <td>{author}</td>
        <td>{date}</td>
      </tr>
    );
  }
}

export default FolderDetailItem;
