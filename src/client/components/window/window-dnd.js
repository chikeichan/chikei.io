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
    selectWindow: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    defaultX: PropTypes.number,
    defaultY: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    actions: PropTypes.array.isRequired,
    buttons: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool
  };

  static defaultProps = {
    isSelected: false
  };

  render() {
    const {
      connectDragSource, isDragging, selectWindow, isMaximized,
      defaultX, defaultY, x, y, windowId, isSelected, isMinimized
    } = this.props;

    return connectDragSource(
      <div
        onClick={e => e.stopPropagation()}
        onMouseDown={() => selectWindow(windowId)}
        className={isSelected && 'window--selected'}
        style={{
          position: 'absolute',
          display: isMinimized ? 'none' : null,
          top: isMaximized ? 0 : y || defaultY,
          left: isMaximized ? 0 : x || defaultX,
          opacity: isDragging ? 0 : 1,
          height: isMaximized ? '100%' : null,
          width: isMaximized ? '100%' : null
        }}>
        <Window {...this.props} />
      </div>
    );
  }
}

export default WindowDnD;
