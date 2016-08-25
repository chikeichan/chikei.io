import {connect} from 'react-redux';
import {moveIcon, deselectIcons} from '../../actions/icons/icons';
import {moveWindow} from '../../actions/windows/windows';
import {bootstrap} from '../../actions/bootstrap';
import Desktop from '../../components/desktop/desktop-dnd';

const mapStateToProps = (state) => {
  return {
    icons: state.icons,
    windows: state.windows
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: () => dispatch(bootstrap()),
    moveIcon: (id, x, y) => dispatch(moveIcon(id, x, y)),
    moveWindow: (id, x, y) => dispatch(moveWindow(id, x, y)),
    deselectIcons: () => dispatch(deselectIcons())
  }
}

const DesktopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktop);

export default DesktopContainer;
