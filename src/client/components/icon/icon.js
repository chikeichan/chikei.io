import React, {Component, PropTypes} from 'react';
import {ICON_TO_CLASSNAME} from '../../enums/icon-types';

class Icon extends Component {
  static propTypes = {
    iconId: PropTypes.string.isRequired,
    name: PropTypes.string
  };

  render() {
    const {
      iconId, name, type, color,
      deselectIcon, isSelected, openApp
    } = this.props;

    return (
      <div
        className="icon-container"
        onDoubleClick={() => openApp(iconId)}>
        <div className={`icon-image icon-image__${type}`} />
        <span className="icon-name" style={{color}}>{name}</span>
      </div>
    );
  }
}

export default Icon;
