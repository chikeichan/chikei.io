import {connect} from 'react-redux';
import {setViewMode} from '../../actions/windows/windows';
import {openBlog} from '../../actions/icons/icons';
import Folder from '../../components/folder/folder';

const mapStateToProps = (state, ownProps) => {
  const viewMode = state.layout.folderViewMode || 'ICON';
  return {viewMode};
}

const mapDispatchToProps = dispatch => {
  return {
    setViewMode: (id, viewMode) => dispatch(setViewMode(id, viewMode)),
    openApp: id => dispatch(openBlog(id))
  };
}


const FolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);

export default FolderContainer;
