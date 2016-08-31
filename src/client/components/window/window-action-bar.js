import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import WindowAction from './window-action';

class WindowActionBar extends Component {
  static propTypes = {
    actions: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedAction: null
    };
  }

  render() {
    const isActive = Boolean(this.state.selectedAction);
    const className = classnames(
      'window-action-bar',
      {'window-action-bar--active': isActive}
    );

    return (
      <div className={className}>
        {this.props.actions.map(action => {
          return (
            <WindowAction
              key={action.name}
              action={action.name}
              menu={action.menu}
              isSelected={this.state.selectedAction === action}
              isActive={Boolean(this.state.selectedAction)}
              selectAction={() => this.setState({selectedAction: action})}
              cancelAction={() => this.setState({selectedAction: null})} />
          );
        })}
      </div>
    );
  }
}

export default WindowActionBar;
