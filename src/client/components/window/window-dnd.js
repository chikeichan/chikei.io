import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import classnames from 'classnames';
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
  },
  canDrag(props) {
    return !props.isMaximized;
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

  onMouseDown(e) {
    const {isSelected, selectWindow, windowId} = this.props;
    e.stopPropagation();
    if (!isSelected) {
      selectWindow(windowId);
    }
  }

  render() {
    const {
      connectDragSource, isDragging, selectWindow, isMaximized, isAutoHide,
      defaultX, defaultY, x, y, windowId, isSelected, isMinimized
    } = this.props;

    const className = classnames('window', {
      'window--selected': isSelected,
      'window--maximized': isMaximized,
      'window--autohide': isAutoHide
    });

    return connectDragSource(
      <div
        onClick={e => e.stopPropagation()}
        onMouseDown={e => this.onMouseDown(e)}
        className={className}
        style={{
          position: 'absolute',
          display: isMinimized ? 'none' : null,
          top: isMaximized ? 0 : y || defaultY || 0,
          left: isMaximized ? 0 : x || defaultX || 0,
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
