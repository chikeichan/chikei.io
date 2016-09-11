import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Window from '../../containers/window-container/window-container';
import ActionBar from './tetris-action-bar';
import Gameboy from '../gameboy/gameboy';

function UP(pos) {
  return [pos[0], pos[1] - 1];
}

function DOWN(pos) {
  return [pos[0], pos[1] + 1];
}

function LEFT(pos) {
  return [pos[0] - 1, pos[1]];
}

function RIGHT(pos) {
  return [pos[0] + 1, pos[1]];
}

const SHAPE_TO_COOR = {
  L0: (x, y) => [ [x, y], UP([x, y]), DOWN([x, y]), DOWN(RIGHT([x, y])) ],
  L1: (x, y) => [ [x, y], LEFT([x, y]), RIGHT([x, y]), DOWN(LEFT([x, y])) ],
  L2: (x, y) => [ [x, y], UP([x, y]), DOWN([x, y]), UP(LEFT([x, y])) ],
  L3: (x, y) => [ [x, y], LEFT([x, y]), RIGHT([x, y]), UP(RIGHT([x, y])) ],
  J0: (x, y) => [ [x, y], UP([x, y]), DOWN([x, y]), DOWN(LEFT([x, y])) ],
  J1: (x, y) => [ [x, y], LEFT([x, y]), RIGHT([x, y]), UP(LEFT([x, y])) ],
  J2: (x, y) => [ [x, y], UP([x, y]), DOWN([x, y]), UP(RIGHT([x, y])) ],
  J3: (x, y) => [ [x, y], LEFT([x, y]), RIGHT([x, y]), DOWN(RIGHT([x, y])) ],
  O0: (x, y) => [ [x, y], RIGHT([x, y]), UP([x, y]), UP(RIGHT([x, y])) ],
  O1: (x, y) => [ [x, y], RIGHT([x, y]), UP([x, y]), UP(RIGHT([x, y])) ],
  O2: (x, y) => [ [x, y], RIGHT([x, y]), UP([x, y]), UP(RIGHT([x, y])) ],
  O3: (x, y) => [ [x, y], RIGHT([x, y]), UP([x, y]), UP(RIGHT([x, y])) ],
  S0: (x, y) => [ [x, y], UP([x, y]), RIGHT([x, y]), DOWN(RIGHT([x, y])) ],
  S1: (x, y) => [ [x, y], RIGHT([x, y]), DOWN([x, y]), DOWN(LEFT([x, y])) ],
  S2: (x, y) => [ [x, y], UP([x, y]), RIGHT([x, y]), DOWN(RIGHT([x, y])) ],
  S3: (x, y) => [ [x, y], RIGHT([x, y]), DOWN([x, y]), DOWN(LEFT([x, y])) ],
  Z0: (x, y) => [ [x, y], RIGHT([x, y]), DOWN([x, y]), RIGHT(UP([x, y])) ],
  Z1: (x, y) => [ [x, y], LEFT([x, y]), DOWN([x, y]), DOWN(RIGHT([x, y])) ],
  Z2: (x, y) => [ [x, y], RIGHT([x, y]), DOWN([x, y]), RIGHT(UP([x, y])) ],
  Z3: (x, y) => [ [x, y], LEFT([x, y]), DOWN([x, y]), DOWN(RIGHT([x, y])) ],
  T0: (x, y) => [ [x, y], DOWN([x, y]), RIGHT([x, y]), LEFT([x, y]) ],
  T1: (x, y) => [ [x, y], DOWN([x, y]), LEFT([x, y]), UP([x, y]) ],
  T2: (x, y) => [ [x, y], UP([x, y]), RIGHT([x, y]), LEFT([x, y]) ],
  T3: (x, y) => [ [x, y], DOWN([x, y]), RIGHT([x, y]), UP([x, y]) ],
  I0: (x, y) => [ [x, y], UP([x, y]), UP(UP([x, y])), DOWN([x, y]) ],
  I1: (x, y) => [ [x, y], RIGHT([x, y]), RIGHT(RIGHT([x, y])), LEFT([x, y]) ],
  I2: (x, y) => [ [x, y], UP([x, y]), UP(UP([x, y])), DOWN([x, y]) ],
  I3: (x, y) => [ [x, y], RIGHT([x, y]), RIGHT(RIGHT([x, y])), LEFT([x, y]) ]
};

const SHAPE_KEYS = Object.keys(SHAPE_TO_COOR);

const ORIGIN = [4, 2];

const STATUS = {
  GAMEOVER: 'GAMEOVER',
  PAUSE: 'PAUSE',
  PREGAME: 'PREGAME',
  INPROGRESS: 'INPROGRESS'
};

class Tetris extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: this.makeFields(),
      currentShape: SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)],
      nextShape: SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)],
      currentPos: ORIGIN,
      status: STATUS.PREGAME,
      score: 0,
      lines: 0,
      level: 1
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
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress(e) {
    switch(e.keyCode) {
      // Left
      case 37:
        return this.move(-1, 0);
      // Up
      case 38:
        return this.rotate();
      // Right
      case 39:
        return this.move(1, 0);
      // Down
      case 40:
        return this.move(0, 1);
      // Enter
      case 13:
        return this.startGame();
      // Escape
      case 27:
        e.preventDefault();
        return this.pauseGame();
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

  rotate() {
    const {fields, currentPos, currentShape, status} = this.state;

    if (status !== STATUS.INPROGRESS) {
      return;
    }

    const direction = Number(currentShape[1]);
    const nextDirection = direction === 3 ? 0 : direction + 1;
    const nextShape = `${currentShape[0]}${nextDirection}`
    const shape = this.getShape(currentPos[0], currentPos[1], nextShape);
    const isValid = this.isValid(shape, fields);

    if (isValid) {
      this.setState({currentShape: nextShape});
    }
  }

  move(offsetX = 0, offsetY = 0, onSuccess = () => {}, onFailure = () => {}) {
    const {fields, currentPos, currentShape, status} = this.state;

    if (status !== STATUS.INPROGRESS) {
      return;
    }

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
    const {fields, currentPos, currentShape, nextShape} = this.state;
    const isOk = fields[2].reduce((ok, n) => ok && n === false, true);


    if (isOk) {
      const shape = this.getShape(currentPos[0], currentPos[1], currentShape);
      const mergedFields = this.mergeShapeWithFields(shape, fields);
      this.setState({
        fields: mergedFields,
        currentPos: ORIGIN,
        currentShape: nextShape,
        nextShape: SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)]
      }, this.calculateNextFrame);
    } else {
      this.setState({status: STATUS.GAMEOVER});
    }
  }

  killRows() {
    const {fields, score, lines} = this.state;
    const adjFields = fields
      .reduce((aField, row) => {
        const clear = row.reduce((shouldClear, cell) => shouldClear && cell, true);
        if (!clear) {
          aField.push(row);
        }
        return aField;
      }, []);

    const newRows = 24 - adjFields.length;
    const nextFields = [
      ...Array(newRows).fill(Array(10).fill(false)),
      ...adjFields
    ];

    this.setState({
      fields: nextFields,
      lines: lines + newRows,
      score: score + (newRows * 100 + (newRows - 1) * newRows * 10)
    });
  }

  startGame() {
    const {status} = this.state;

    switch(status) {
      case STATUS.PAUSE:
      case STATUS.PREGAME:
        this.setState({status: STATUS.INPROGRESS});
        this.calculateFrame();
        return;
      case STATUS.GAMEOVER:
        this.setState({
          fields: this.makeFields(),
          currentShape: SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)],
          nextShape: SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)],
          currentPos: ORIGIN,
          status: STATUS.INPROGRESS,
          score: 0,
          lines: 0,
          level: 1
        });
        this.calculateFrame();
        return;
      case STATUS.INPROGRESS:
      default:
        return;
    }
  }

  pauseGame() {
    const {status} = this.state;

    switch(status) {
      case STATUS.INPROGRESS:
        this.setState({status: STATUS.PAUSE});
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        return;
      case STATUS.GAMEOVER:
      case STATUS.PAUSE:
      case STATUS.PREGAME:
      default:
        return;
    }
  }

  calculateFrame() {
    this.move(0, 1, this.calculateNextFrame, this.loseOrSpawn);
    this.killRows();
  }

  calculateNextFrame() {
    this.timeout = setTimeout(this.calculateFrame, 500/this.state.level);
  }

  renderRow(row, rowIndex) {
    return (
      <div key={`row-${rowIndex}`} className="tetris-row"> 
        {row.map((cell, cellIndex) => this.renderCell(cell, cellIndex, rowIndex))}
      </div>
    );
  }

  renderCell(cell, cellIndex, rowIndex) {
    const className = classnames(
      'tetris-cell',
      {'tetris-cell__block': cell}
    );
    return <div key={`row-${rowIndex}-cell-${cellIndex}`} className={className} />;
  }

  mergeShapeWithFields(shape, fields) {
    return shape.reduce((merged, pos) => {
      const y = pos[1];
      const x = pos[0];
      merged[y] = merged[y].map((n, i) => i === x ? true : n);
      return merged;
    }, [...fields]);
  }

  renderGame() {
    const {fields, currentPos, currentShape, status} = this.state;

    if (status === STATUS.PREGAME) {
      return fields.map((row, rowIndex) => this.renderRow(row, rowIndex));
    }

    const shape = this.getShape(currentPos[0], currentPos[1], currentShape);
    const mergedFields = this.mergeShapeWithFields(shape, fields);
    return mergedFields.map((row, rowIndex) => this.renderRow(row, rowIndex));
  }

  renderPreview() {
    const fields = Array(4).fill(Array(4).fill(false));

    if (this.state.status === STATUS.PREGAME) {
      return fields.map((row, rowIndex) => this.renderRow(row, rowIndex));
    }

    const shape = this.getShape(1, 2, this.state.nextShape);
    const mergedFields = this.mergeShapeWithFields(shape, fields);
    return mergedFields.map((row, rowIndex) => this.renderRow(row, rowIndex));
  }

  renderModal() {
    const {status} = this.state;
    const itemText = classnames({
      'START GAME': status === STATUS.PREGAME,
      'RESUME': status === STATUS.PAUSE,
      'NEW GAME': status === STATUS.GAMEOVER,
    });

    return status === STATUS.INPROGRESS ? null : (
      <div className="tetris-modal">
        <div className="tetris-pause-menu">
          <div className="tetris-pause-menu-item">{itemText}</div>
        </div>
      </div>
    );
  }

  render() {
    const {actions} = this.props;
    return (
      <Window 
        {...this.props}
        isAutoHide={this.state.status === STATUS.INPROGRESS}>
        <ActionBar actions={actions} />
        <Gameboy>
          <div className="tetris-wrapper">
            {this.renderModal()}
            <div className="tetris-game-background">
              <div className="tetris-game-field">
                {this.renderGame()}
              </div>
            </div>
            <div className="tetris-game-info">
              <div className="tetris-score-wrapper">
                <div className="tetris-score-header">
                  <div className="tetris-score-header-text-wrapper">
                    <div className="tetris-score-header-text">SCORE</div>
                  </div>
                </div>
                <div className="tetris-score-body">
                  <div className="tetris-score">
                    {this.state.score}
                  </div>
                </div>
              </div>
              <div className="tetris-card-wrapper">
                  <div className="tetris-card-body-wrapper">
                    <div className="tetris-card-header-text">LEVEL</div>
                    <div className="tetris-card-text">{this.state.level}</div>
                  </div>
              </div>
              <div className="tetris-card-wrapper">
                  <div className="tetris-card-body-wrapper">
                    <div className="tetris-card-header-text">LINES</div>
                    <div className="tetris-card-text">{this.state.lines}</div>
                  </div>
              </div>
              <div className="tetris-card-wrapper tetris-preview">
                  <div className="tetris-card-body-wrapper">
                    {this.renderPreview()}
                  </div>
              </div>
            </div>
          </div>
        </Gameboy>
      </Window>
    );
  }
}

export default Tetris;
