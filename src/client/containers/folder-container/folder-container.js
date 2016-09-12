import {connect} from 'react-redux';
import {setViewMode} from '../../actions/windows/windows';
import Folder from '../../components/folder/folder';

const mapStateToProps = (state, ownProps) => {
  const viewMode = state.layout.folderViewMode || 'ICON';
  return {viewMode};
}

const mapDispatchToProps = dispatch => {
  return {
    setViewMode: (id, viewMode) => dispatch(setViewMode(id, viewMode))
  };
}


const FolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);

export default FolderContainer;
