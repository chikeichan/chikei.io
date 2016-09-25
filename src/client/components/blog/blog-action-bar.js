import React, {Component, PropTypes} from 'react';
import ActionBar from '../window/window-action-bar';
import FacebookShareButton from '../share-buttons/fb-share-button';
import LinkedInShareButton from '../share-buttons/li-share-button';
import WindowActionMenu from '../window/window-action-menu';
import {FILE, VIEW, SHARE} from '../../enums/window-element-types';

class BlogActionBar extends Component {
  static propTypes = {
    actions: PropTypes.array.isRequired
  };

  static defaultProps = {
    actions: []
  };

  static contextTypes = {
    closeWindow: PropTypes.func
  };

  getUrl() {
    const {blogId} = this.props;
    const encoded = encodeURIComponent(blogId.replace(/BLOG__/g, ''));
    return `http://104.198.104.19:8000/b/${encoded}`;
  }

  renderActionMenu(action) {
    switch(action) {
      case FILE:
        return (
          <WindowActionMenu>
            <div onClick={this.context.closeWindow}>Exit</div>
          </WindowActionMenu>
        );
      case SHARE:
        return (
          <WindowActionMenu>
            <FacebookShareButton url={this.getUrl()} />
            <LinkedInShareButton url={this.getUrl()} />
          </WindowActionMenu>
        );
      default:
        return;
    }
  }

  mapMenuToActions(actions) {
    return actions.map(action => {
      const name = action;
      const menu = this.renderActionMenu(action);
      return {name, menu};
    })
  }

  render() {
    return (
        <ActionBar actions={this.mapMenuToActions(this.props.actions)} />
    );
  }
}

export default BlogActionBar;
