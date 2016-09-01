import React, {Component, PropTypes} from 'react';
import marked from 'marked';
import {highlightBlock} from 'highlight.js'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});

class Markdown extends Component {
  static propTypes = {
    markdown: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.markdown !== this.props.markdown;
  }

  markup(md) {
    return marked(md);
  }

  highlight(el) {
    if (!el) {
      return;
    }

    const codes = el.querySelectorAll('code');
    for (let code of codes) {
      highlightBlock(code);
    }
  }

  render() {
    const {className, style, markdown} = this.props;
    return (
      <div 
        className={className}
        style={style}
        ref={el => this.highlight(el)}
        dangerouslySetInnerHTML={{__html: this.markup(markdown)}} />
    );
  }
}

export default Markdown;
