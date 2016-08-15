import {connect} from 'react-redux';
import {addIcon} from '../../actions/layout/layout';
import Desktop from '../../components/desktop/desktop';

const mapStateToProps = (state) => {
  return {
    icons: state.layout.icons
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadIcons: () => dispatch(addIcon('MINESWEEPER'))
  }
}

const DesktopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktop);

export default DesktopContainer;
