import {connect} from 'react-redux';
import {closeWindow} from '../../actions/windows/windows';
import MobileCloseButton from '../../components/navigation-bar/mobile-close-button';

const mapStateToProps = (state, ownProps) => {
  return {
    id: Object.keys(state.layout.selectedWindow)[0]
  };
}

const mapDispatchToProps = dispatch => {
  return {
    closeWindow: id => dispatch(closeWindow(id))
  };
}

const MobileCloseButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileCloseButton);

export default MobileCloseButtonContainer;
