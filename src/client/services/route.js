import React, {Component} from 'react';
import {connect} from 'react-redux';
import window from 'global/window';
import {openApp, openBlog, openCode, openDemo} from '../actions/icons/icons';

const mapDispatchToProps = dispatch => {
  return {
    openApp: id => dispatch(openApp(id)),
    openDemo: id => dispatch(openDemo(id)),
    openBlog: id => dispatch(openBlog(id)),
    openCode: id => dispatch(openCode(id))
  };
}


class RouteService extends Component {
  componentWillMount() {
    if (window.HashChangeEvent) {
      window.location.hash = '';
      window.onhashchange = () => this.onhashchange();
    }
  }

  onhashchange() {
    const action = location.hash.slice(1);
    const params = action.split('=');

    if (action) {
      window.location.hash = '';
    }

    switch (params[0]) {
      case "app":
        return this.props.openApp(params[1]);
      case "demo":
        return this.props.openDemo(params[1]);
      case "blog":
        return this.props.openBlog(params[1]);
      case "code":
        return this.props.openCode(params[1]);
      default:
        return;
    }
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  mapDispatchToProps
)(RouteService);
