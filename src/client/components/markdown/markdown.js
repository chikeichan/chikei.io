import React, {Component, PropTypes} from 'react';
import window from 'global/window';

class Markdown extends Component {
  static propTypes = {
    markdown: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.markdown !== this.props.markdown;
  }

  markup(md) {
    return md;
  }

  decorate(el) {
    if (!el) {
      return;
    }

    // const codes = el.querySelectorAll('code');
    // for (let code of codes) {
    //   // highlight(code, Prism.languages.html);
    // }
  }

  render() {
    const {className, style, markdown} = this.props;
    return (
      <div 
        className={`markdown-wrapper ${className}`}
        style={style}
        ref={el => this.decorate(el)}
        dangerouslySetInnerHTML={{__html: this.markup(markdown)}} />
    );
  }
}

export default Markdown;
