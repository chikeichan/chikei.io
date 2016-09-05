import {connect} from 'react-redux';
import {closeWindow} from '../../actions/windows/windows';
import ErrorDialog from '../../components/error/error';

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    closeWindow: id => dispatch(closeWindow(id))
  };
}


const ErrorDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorDialog);

export default ErrorDialogContainer;
