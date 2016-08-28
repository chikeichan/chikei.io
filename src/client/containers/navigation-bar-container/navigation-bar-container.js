import {connect} from 'react-redux';
import {selectWindow} from '../../actions/windows/windows';
import NavigationBar from '../../components/navigation-bar/navigation-bar';

const mapStateToProps = (state, ownProps) => {
  return {
    windows: state.windows,
    selectedWindow: state.layout.selectedWindow
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectWindow: id => dispatch(selectWindow(id))
  };
}

const NavigationBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

export default NavigationBarContainer;
