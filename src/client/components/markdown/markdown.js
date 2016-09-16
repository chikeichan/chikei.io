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

  addLineNumbers(el) {
    const codes = el.querySelectorAll('code');
    for (let code of codes) {
      // works only for <code> wrapped inside <pre> (not inline)
      const pre = code.parentNode;
      const clsReg = /\s*\bline-numbers\b\s*/;

      // Abort if line numbers already exists
      if (code.querySelector(".line-numbers-rows")) {
        return;
      }

      // Add the class "line-numbers" to the <pre>
      if (!clsReg.test(pre.className)) {
        pre.className += ' line-numbers';
      }

      var match = code.textContent.match(/\n(?!$)/g);
      var linesNum = match ? match.length + 1 : 1;
      var lineNumbersWrapper;

      var lines = new Array(linesNum + 1);
      lines = lines.join('<span></span>');

      lineNumbersWrapper = document.createElement('span');
      lineNumbersWrapper.setAttribute('aria-hidden', 'true');
      lineNumbersWrapper.className = 'line-numbers-rows';
      lineNumbersWrapper.innerHTML = lines;

      if (pre.hasAttribute('data-start')) {
        pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
      }

      code.appendChild(lineNumbersWrapper);
    }
  }

  decorate(el) {
    if (!el) {
      return;
    }

    if (this.props.lineNumbers) {
      this.addLineNumbers(el);
    }
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
