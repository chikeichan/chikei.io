import {connect} from 'react-redux';
import {selectWindow} from '../../actions/windows/windows';
import Window from '../../components/window/window-dnd';

const mapStateToProps = (state, ownProps) => {
  const {windowId} = ownProps;
  const appWindow = state.windows[windowId];
  const isSelected = state.layout.selectedWindow[windowId];
  return {...appWindow, isSelected};
}

const mapDispatchToProps = dispatch => {
  return {
    selectWindow: id => dispatch(selectWindow(id))
  };
}


const WindowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);

export default WindowContainer;
