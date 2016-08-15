import React, {Component, PropTypes} from 'react';
import {ICON_TO_CLASSNAME} from '../../enums/icon-types';

class Icon extends Component {
  render() {
    const {iconType, name} = this.props;
    return (
      <div className={ICON_TO_CLASSNAME[iconType]}></div>
    );
  }
}

Icon.propTypes = {
  iconType: PropTypes.string.isRequired,
  positionX: PropTypes.number,
  positionY: PropTypes.number,
};

export default Icon;
