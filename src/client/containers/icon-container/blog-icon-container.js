import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectIcon, openBlog} from '../../actions/icons/icons';
import Icon from '../../components/icon/icon';

const mapStateToProps = (state, ownProps) => {
  const {iconId} = ownProps;
  const icon = state.icons[iconId];
  const isSelected = state.layout.selectedIcon[iconId];
  return {
    ...icon,
    isSelected
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectIcon: id => dispatch(selectIcon(id)),
    openApp: id => dispatch(openBlog(id))
  }
}

class BlogIcon extends Component {
  constructor(props) {
    super(props);
    this.selectIcon = this.selectIcon.bind(this);
  }

  selectIcon(e) {
    const {iconId, selectIcon} = this.props;
    e.stopPropagation();
    selectIcon(iconId);
  }

  render() {
    const {isSelected} = this.props;
    return (
      <div
        className={isSelected && 'icon--selected'}
        onClick={e => e.stopPropagation()}
        onMouseDown={this.selectIcon}
        style={{
          display: 'inline-block',
          position: 'relative'
        }}>
        <Icon {...this.props} />
      </div>
    );
  }
}

const IconContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogIcon);

export default IconContainer;
