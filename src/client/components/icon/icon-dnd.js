import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import pureRender from 'pure-render-decorator';
import {DragSource} from 'react-dnd';
import Icon from './icon';
import {ICON} from '../../enums/item-types.js';

const spec = {
  beginDrag(props) {
    const {iconId, defaultX, defaultY, x, y} = props;
    return {
      type: ICON,
      id: iconId,
      x: x || defaultX,
      y: y || defaultY
    };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

@DragSource(ICON, spec, collect)
@pureRender
class IconDnD extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    selectIcon: PropTypes.func.isRequired,
    defaultX: PropTypes.number,
    defaultY: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  };

  static defaultProps = {
    isSelected: false
  };

  constructor(props) {
    super(props);
    this.selectIcon = this.selectIcon.bind(this);
  }

  selectIcon(e) {
    const {iconId, selectIcon} = this.props;
    e.stopPropagation();
    selectIcon(iconId);
  }

  render() {
    const {
      connectDragSource, isDragging, isSelected,
      defaultX, defaultY, x, y
    } = this.props;

    const className = classnames(
      'icon-wrapper',
      {'icon--selected': isSelected}
    );

    return connectDragSource(
      <div
        className={className}
        onClick={e => e.stopPropagation()}
        onMouseDown={this.selectIcon}
        style={{
          top: y || defaultY,
          left: x || defaultX,
          opacity: isDragging ? 0.5 : 1
        }}>
        <Icon {...this.props} />
      </div>
    );
  }
}

export default IconDnD;
