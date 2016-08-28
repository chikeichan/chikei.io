import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

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
    const {toggleFlag, id} = this.props;
    e.preventDefault();
    toggleFlag(id);
  } 

  render() {
    const {isOpen, isFlag, id, content, clickCell, toggleFlag} = this.props;
    const className = classnames(
      'minesweeper-cell',
      {
        'minesweeper-cell__flagged': !isOpen && isFlag,
        'minesweeper-cell__opened': isOpen,
        'minesweeper-cell__bombed': isOpen && content < 0,
        'minesweeper-cell__closed': !isOpen && !isFlag
      }
    );
    return (
      <div 
        className={className}
        style={this.getStyle()}
        draggable={false}
        onClick={() => clickCell(id)}
        onContextMenu={this.onRightClick} >
        {this.getContent()}
      </div>
    );
  }
}

export default MinesweeperCell;
