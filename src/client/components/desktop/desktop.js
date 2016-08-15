import React, {Component, PropTypes} from 'react';
import Icon from '../icon/icon';

class Desktop extends Component {
  componentWillMount() {
    this.props.loadIcons();
  }

  renderIcons() {
    return Object.keys(this.props.icons)
      .map(iconType => <Icon key="minesweeper" iconType={iconType} />);
  }

  render() {
    return (
      <div className="desktop">
        {this.renderIcons()}
      </div>
    );
  }
}

export default Desktop;
