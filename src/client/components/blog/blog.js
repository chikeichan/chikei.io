import React, {Component, PropTypes} from 'react';
import marked from 'marked';
import Window from '../../containers/window-container/window-container';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});

class Folder extends Component {
  static propTypes = {
    appData: PropTypes.object.isRequired
  };

  render() {
    return (
      <Window {...this.props}>
        <div className="blog-container">
          <div className="blog-content">
            <div dangerouslySetInnerHTML={{__html: marked(this.props.appData.markdown)}} />
          </div>
        </div>
      </Window>
    );
  }
}

export default Folder;
