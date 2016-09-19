import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class CodeReaderNavFolder extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const {isOpen} = this.state;

    e.stopPropagation();
    this.setState({isOpen: !isOpen})
  }

  renderName(name) {
    const iconClassName = classnames(
      'code-reader-item-icon',
      {
        'icon-image__FOLDER': this.state.isOpen,
        'icon-image__FOLDER_CLOSED': !this.state.isOpen
      }
    );

    return (
      <div
        className="code-reader-item-wrapper"
        onClick={this.onClick} >
        <div className={iconClassName} />
        <div className="code-reader-item-name">{name}</div>
      </div>
    );
  }

  render() {
    const {isOpen} = this.state;
    const {name, children} = this.props;
    const className = classnames(
      'code-reader__nav-dir',
      {
        'code-reader__nav-dir--opened': isOpen,
        'code-reader__nav-dir--closed': !isOpen
      }
    );
    return (
      <div className={className}>
        {this.renderName(name)}
        <div className="code-reader__nav-dir--content">
          {children}
        </div>
      </div>
    );
  }
}

export default CodeReaderNavFolder;
