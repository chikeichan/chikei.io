import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {DragSource} from 'react-dnd';
import Icon from './icon';
import {ICON} from '../../enums/item-types.js';

const spec = {
  beginDrag(props) {
    const {iconId, defaultX, defaultY, x, y} = props;
    return {
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
    defaultX: PropTypes.number,
    defaultY: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  };

  render() {
    const {
      connectDragSource, isDragging, 
      defaultX, defaultY, x, y
    } = this.props;

    return connectDragSource(
      <div style={{
        position: 'absolute',
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
