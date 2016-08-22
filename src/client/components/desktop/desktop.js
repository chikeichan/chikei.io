import React, {Component, PropTypes} from 'react';
import Icon from '../../containers/icon-container/icon-container';

const ICON_POS = [
  {x: 0, y: 0},
  {x: 0, y: 80},
  {x: 0, y: 160},
  {x: 0, y: 240},
];

class Desktop extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return Object.keys(this.props.icons).join('-') !== Object.keys(nextProps.icons).join('-');
  }

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
            defaultX={pos.x}
            defaultY={pos.y}
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
