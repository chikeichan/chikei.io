import {connect} from 'react-redux';
import {selectIcon, openApp} from '../../actions/icons/icons';
import Icon from '../../components/icon/icon-dnd';

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
    openApp: id=> dispatch(openApp(id))
  }
}

const IconContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Icon);

export default IconContainer;
