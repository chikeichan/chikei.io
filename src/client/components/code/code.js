import React, {Component, PropTypes} from 'react';
import Markdown from '../markdown/markdown';

class Code extends Component {
  static propTypes = {
    markdown: PropTypes.string.isRequired,
    metadata: PropTypes.object
  };

  static defaultProps = {
    markdown: ''
  };

  shouldComponentUpdate(nextProps) {
    return this.props.markdown !== nextProps.markdown;
  }

  render() {
    const {metadata, markdown} = this.props;
    return (
      <div className="code-container">
        <div className="code-content">
          <Markdown
            className="code-markdown"
            lineNumbers={true}
            markdown={markdown} />
        </div>
      </div>
    );
  }
}

export default Code;
