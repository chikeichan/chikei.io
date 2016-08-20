import {connect} from 'react-redux';
import {fetchIcons} from '../../actions/layout/layout';
import Desktop from '../../components/desktop/desktop';

const mapStateToProps = (state) => {
  return {
    icons: state.layout.icons
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIcons: () => dispatch(fetchIcons())
  }
}

const DesktopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktop);

export default DesktopContainer;
