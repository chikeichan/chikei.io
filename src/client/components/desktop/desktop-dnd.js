import React, {Component, PropTypes} from 'react';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Desktop from './desktop';
import {ICON, WINDOW} from '../../enums/item-types.js';

const spec = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const x = Math.round(item.x + delta.x);
    const y = Math.round(item.y + delta.y);
    switch(item.type) {
      case ICON:
        return props.moveIcon(item.id, x, y);
      case WINDOW:
        return props.moveWindow(item.id, x, y);
      default:
        return;
    }
  }
};

const connect = connect => ({
  connectDropTarget: connect.dropTarget()
});

@DragDropContext(HTML5Backend)
@DropTarget([ICON, WINDOW], spec, connect)
class DesktopDnD extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };

  render() {
    const {connectDropTarget} = this.props;
    return connectDropTarget(
      <div className="desktop">
        <Desktop {...this.props} />
      </div>
    );
  }
}

export default DesktopDnD
