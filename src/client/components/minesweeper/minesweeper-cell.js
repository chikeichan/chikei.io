import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {STATUS} from '../../enums/minesweeper-action-types';
const {WIN, LOSE, PENDING} = STATUS;

const CONTENT_TO_COLOR = [
  null,
  'blue',
  'green',
  'red',
  'purple',
  'maroon',
  'turquoise',
  'black',
  'gray',
];

class MinesweeperCell extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    isFlag: PropTypes.bool,
    id: PropTypes.number.isRequired,
    content: PropTypes.number.isRequired,
    clickCell: PropTypes.func.isRequired
  };

  static defaultProps = {
    isOpen: false,
    isFlag: false
  };

  constructor(props) {
    super(props);
    this.onRightClick = this.onRightClick.bind(this);
    this.onLeftClick = this.onLeftClick.bind(this);
  }

  getContent() {
    const {isOpen, content} = this.props;
    return isOpen && content > 0 ? content : '';
  }

  getStyle() {
    const {content} = this.props;
    const color = CONTENT_TO_COLOR[content];
    return {color};
  }

  onRightClick(e) {
    e.preventDefault();
    const {toggleFlag, id, status} = this.props;
    
    if (status !== PENDING) {
      return;
    }

    toggleFlag(id);
  }

  onLeftClick(e) {
    const {clickCell, id, status} = this.props;
    
    if (status !== PENDING) {
      return;
    }

    clickCell(id);
  }

  render() {
    const {
      isOpen, isFlag, id, content,
      status, lastClicked
    } = this.props;
    const className = classnames(
      'minesweeper-cell',
      {
        'minesweeper-cell__flagged': !isOpen && isFlag,
        'minesweeper-cell__opened': isOpen,
        'minesweeper-cell__bombed': isOpen && content < 0,
        'minesweeper-cell__closed': !isOpen && !isFlag,
        'minesweeper-cell__gameover': status === LOSE && lastClicked,
        'minesweeper-cell__defused': status !== PENDING && !isOpen && isFlag && content < 0,
        'minesweeper-cell__defused--incorrect': status !== PENDING && !isOpen && isFlag && content > -1
      }
    );
    return (
      <div 
        className={className}
        style={this.getStyle()}
        draggable={false}
        onClick={this.onLeftClick}
        onContextMenu={this.onRightClick} >
        {this.getContent()}
      </div>
    );
  }
}

export default MinesweeperCell;
