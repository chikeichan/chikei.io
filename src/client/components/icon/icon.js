import React, {Component, PropTypes} from 'react';
import {ICON_TO_CLASSNAME} from '../../enums/icon-types';

class Icon extends Component {
  static propTypes = {
    iconId: PropTypes.string.isRequired,
    name: PropTypes.string,
    isSelected: PropTypes.bool
  };

  render() {
    const {iconId, name, selectIcon, deselectIcon, isSelected} = this.props;

    return (
      <div
        className="icon-container"
        onClick={this.selectIcon}>
        <div className={`icon-image ${ICON_TO_CLASSNAME[iconId]}`} />
        <span className="icon-name">{name}</span>
      </div>
    );
  }
}

export default Icon;
