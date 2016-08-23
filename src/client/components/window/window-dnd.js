import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {DragSource} from 'react-dnd';
import Window from './window';
import {WINDOW} from '../../enums/item-types.js';

const spec = {
  beginDrag(props) {
    const {windowId, defaultX, defaultY, x, y} = props;
    return {
      type: WINDOW,
      id: windowId,
      x: x || defaultX,
      y: y || defaultY
    };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

@DragSource(WINDOW, spec, collect)
@pureRender
class WindowDnD extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    defaultX: PropTypes.number,
    defaultY: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    actions: PropTypes.array.isRequired,
    buttons: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
  };

  render() {
    const {
      connectDragSource, isDragging, 
      defaultX, defaultY, x, y
    } = this.props;

    return connectDragSource(
      <div 
        style={{
          position: 'absolute',
          top: y || defaultY,
          left: x || defaultX,
          opacity: isDragging ? 0 : 1
        }}>
        <Window {...this.props} />
      </div>
    );
  }
}

export default WindowDnD;
