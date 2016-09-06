import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Window from '../../containers/window-container/window-container';
import ActionBar from './tetris-action-bar';
import Gameboy from '../gameboy/gameboy';

const SHAPE_TO_COOR = {
  L: (x, y) => [[x, y], [x, y - 1], [x, y - 2], [x + 1, y]],
  J: (x, y) => [[x, y], [x, y - 1], [x, y - 2], [x - 1, y]],
  O: (x, y) => [[x, y], [x + 1, y], [x, y - 1], [x + 1, y - 1]],
  S: (x, y) => [[x, y], [x, y - 1], [x + 1, y], [x + 1, y + 1]],
  Z: (x, y) => [[x, y], [x + 1, y], [x + 1, y - 1], [x, y + 1]],
  T: (x, y) => [[x, y], [x, y - 1], [x + 1, y], [x - 1, y]],
  I: (x, y) => [[x, y], [x, y - 1], [x, y - 2], [x, y + 1]]
};

const ORIGIN = [4, 2];

class Tetris extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: this.makeFields(),
      currentShape: ['L', 'J', 'O', 'S', 'Z', 'T', 'I'][Math.floor(Math.random() * 7)],
      currentPos: ORIGIN
    };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.loseOrSpawn = this.loseOrSpawn.bind(this);
    this.calculateFrame = this.calculateFrame.bind(this);
    this.calculateNextFrame = this.calculateNextFrame.bind(this);
  }

  makeFields() {
    return Array(24)
      .fill(Array(10).fill(false));
  }

  componentWillMount() {
    window.addEventListener('keydown', this.onKeyPress);
    setTimeout(() => this.setState({isOn: true}), 0);
    this.calculateFrame();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress(e) {
    switch(e.keyCode) {
      // Left
      case 37:
        this.move(-1, 0);
        return;
      // Up
      case 38:
        return;
      // Right
      case 39:
        this.move(1, 0);
        return;
      // Down
      case 40:
        this.move(0, 1);
        return;
      default:
        return;
    }
  }

  getShape(x, y, shape) {
    return SHAPE_TO_COOR[shape](x, y);
  }

  isValid(shape, fields) {
    return shape.reduce((isValid, pos) => {
      const y = pos[1];
      const x = pos[0];
      return isValid && fields[y] && fields[y][x] === false;
    }, true);
  }

  move(offsetX = 0, offsetY = 0, onSuccess = () => {}, onFailure = () => {}) {
    const {fields, currentPos, currentShape} = this.state;
    const x = currentPos[0] + offsetX;
    const y = currentPos[1] + offsetY;
    const shape = this.getShape(x, y, currentShape);
    const isValid = this.isValid(shape, fields);

    if (isValid) {
      this.setState({
        currentPos: [x, y]
      }, onSuccess);
      return;
    }

    if (offsetY === 1) {
      onFailure();
    }
  }

  loseOrSpawn(onSpawn) {
    const {fields, currentPos, currentShape} = this.state;
    const isOk = fields[0].reduce((ok, n) => ok && n === false, true);


    if (isOk) {
      const shape = this.getShape(currentPos[0], currentPos[1], currentShape);
      const mergedFields = this.mergeShapeWithFields(shape, fields);
      this.setState({
        fields: mergedFields,
        currentPos: ORIGIN,
        currentShape: ['L', 'J', 'O', 'S', 'Z', 'T', 'I'][Math.floor(Math.random() * 7)]
      }, this.calculateNextFrame);
    } else {

    }
  }

  calculateFrame() {
    console.log('calculating')
    this.move(
      0, 1,
      this.calculateNextFrame,
      this.loseOrSpawn
    );
  }

  calculateNextFrame() {
    setTimeout(this.calculateFrame, 200)
  }

  renderRow(row) {
    return (
      <div className="tetris-row"> 
        {row.map(cell => this.renderCell(cell))}
      </div>
    );
  }

  renderCell(cell) {
    const className = classnames(
      'tetris-cell',
      {'tetris-cell__block': cell}
    );
    return <div className={className} />;
  }

  mergeShapeWithFields(shape, fields) {
    return shape.reduce((merged, pos) => {
      const y = pos[1];
      const x = pos[0];
      merged[y] = merged[y].map((n, i) => i === x ? true : n);
      return merged
    }, [...fields]);
  }

  renderGame() {
    const {fields, currentPos, currentShape} = this.state;
    const shape = this.getShape(currentPos[0], currentPos[1], currentShape);
    const mergedFields = this.mergeShapeWithFields(shape, fields);
    return mergedFields.map(row => this.renderRow(row));
  }

  render() {
    const {actions} = this.props;
    return (
      <Window 
        {...this.props}
        isAutoHide={true}>
        <ActionBar actions={actions} />
        <Gameboy>
          <div className="tetris-wrapper">
            <div className="tetris-game-background">
              <div className="tetris-game-field">
                {this.renderGame()}
              </div>
            </div>
            <div className="tetris-game-info" />
          </div>
        </Gameboy>
      </Window>
    );
  }
}

export default Tetris;
