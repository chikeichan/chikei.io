import React, {Component, PropTypes} from 'react';
import Icon from '../icon/icon-dnd';

const ICON_POS = [
  {x: 0, y: 0},
  {x: 0, y: 80},
  {x: 0, y: 160},
  {x: 0, y: 240},
];

class Desktop extends Component {
  componentWillMount() {
    this.props.fetchIcons();
  }

  renderIcons() {
    return Object.keys(this.props.icons)
      .map((iconId, i) => {
        const icon = this.props.icons[iconId];
        const {name} = icon;
        const pos = ICON_POS[i];
        return (
          <Icon
            key={iconId}
            iconId={iconId}
            style={{
              top: icon.y || pos.y,
              left: icon.x || pos.x
            }}
            name={name}/>
        );
      });
  }

  render() {
    return (
      <div>
        {this.renderIcons()}
      </div>
    );
  }
}

export default Desktop;
