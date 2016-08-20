import React, {Component, PropTypes} from 'react';
import {ICON_TO_CLASSNAME} from '../../enums/icon-types';

class Icon extends Component {
  render() {
    const {iconId, name, style} = this.props;
    return (
      <div
        className="icon-container"
        style={style}>
        <div className={`icon-image ${ICON_TO_CLASSNAME[iconId]}`} />
        <span className="icon-name">{name}</span>
      </div>
    );
  }
}

Icon.propTypes = {
  iconId: PropTypes.string.isRequired,
  name: PropTypes.string,
  positionX: PropTypes.number,
  positionY: PropTypes.number,
};

export default Icon;
