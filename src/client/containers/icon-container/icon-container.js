import {connect} from 'react-redux';
import {fetchIcons, moveIcon} from '../../actions/icons/icons';
import Icon from '../../components/icon/icon-dnd';

const mapStateToProps = (state, ownProps) => {
  const icon = state.icons[ownProps.iconId];
  return {...icon};
}

const IconContainer = connect(
  mapStateToProps
)(Icon);

export default IconContainer;
