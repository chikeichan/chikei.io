import {connect} from 'react-redux';
import {fetchIcons, moveIcon} from '../../actions/layout/layout';
import Desktop from '../../components/desktop/desktop-dnd';

const mapStateToProps = (state) => {
  return {
    icons: state.layout.icons
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIcons: () => dispatch(fetchIcons()),
    moveIcon: (id, x, y) => dispatch(moveIcon(id, x, y))
  }
}

const DesktopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktop);

export default DesktopContainer;