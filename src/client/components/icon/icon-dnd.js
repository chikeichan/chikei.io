import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';
import Icon from './icon';
import {ICON} from '../../enums/item-types.js';

const spec = {
  beginDrag(props) {
    return {
      id: props.iconId,
      x: props.style.left,
      y: props.style.top
    };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

@DragSource(ICON, spec, collect)
class IconDnD extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const {connectDragSource, isDragging, style} = this.props;

    return connectDragSource(
      <div style={{
        ...style,
        position: 'absolute'
      }}>
        <Icon {...this.props} />
      </div>
    );
  }
}

export default IconDnD;
