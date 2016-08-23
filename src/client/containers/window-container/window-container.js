import {connect} from 'react-redux';
import Window from '../../components/window/window-dnd';

const mapStateToProps = (state, ownProps) => {
  const appWindow = state.windows[ownProps.windowId];
  return {...appWindow};
}

const WindowContainer = connect(
  mapStateToProps
)(Window);

export default WindowContainer;
