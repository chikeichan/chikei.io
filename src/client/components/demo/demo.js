import React, {Component, PropTypes} from 'react';
import window from 'global/window';
import Window from '../../containers/window-container/window-container';

class Demo extends Component {
  static propTypes = {
    appData: PropTypes.object.isRequired
  };

  static defaultProps = {
    appData: {
      markdown: '',
      metadata: {
        title: ''
      }
    }
  };

  shouldComponentUpdate(nextProps) {
    return this.props.appData.markdown !== nextProps.markdown;
  }

  extractscript(html) {
    const extracted = /<script>(.+)<\/script>/gi.exec(html.split('\n').join(''));
    if (window.eval) {
      window.eval(`(function(){${extracted[1]}})()`);
    }
  }

  render() {
    const {appData} = this.props;
    const {metadata, markdown} = appData;

    return (
      <Window {...this.props}>
        <div className="demo-container">
          <div className="demo-content">
            <div
              className="demo-markdown"
              ref={el => this.extractscript(markdown)}
              dangerouslySetInnerHTML={{__html: markdown}} />
          </div>
        </div>
      </Window>
    );
  }
}

export default Demo;
