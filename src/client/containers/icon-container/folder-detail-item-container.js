import {connect} from 'react-redux';
import {selectIcon, openBlog} from '../../actions/icons/icons';
import FolderDetailItem from '../../components/folder/folder-detail-item';

const mapStateToProps = (state, ownProps) => {
  const {iconId} = ownProps;
  const icon = state.icons[iconId];
  const isSelected = state.layout.selectedIcon[iconId];
  return {
    ...icon,
    isSelected
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectIcon: id => dispatch(selectIcon(id)),
    openBlog: id => dispatch(openBlog(id))
  }
}

const FolderDetailItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderDetailItem);

export default FolderDetailItemContainer;
