import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Window from '../../containers/window-container/window-container';
import ActionBar from './code-reader-action-bar';
import NavFolder from './code-reader-nav-folder';
import Code from '../code/code';

class CodeReader extends Component {
  static propTypes = {
    appData: PropTypes.array.isRequired
  };

  static defaultProps = {
    appData: []
  };

  constructor(props) {
    super(props);
    this.state = {
      markdown: '',
      selectedId: ''
    };
  }

  renderName(name, iconClassName = '') {
    return (
      <div className="code-reader-item-wrapper">
        <div className={`code-reader-item-icon ${iconClassName}`} />
        <div className="code-reader-item-name">{name}</div>
      </div>
    );
  }

  renderFile(id, name, markdown) {
    const className = classnames(
      'code-reader__nav-file',
      {'code-reader__nav-file--selected': this.state.selectedId === id}
    );

    return (
      <div
        key={id}
        className={className}
        onClick={() => this.setState({markdown, selectedId: id})}>
        {this.renderName(name, 'icon-image__CODE')}
      </div>
    );
  }

  renderDir(id, name, files) {
    return (
      <NavFolder
        key={id}
        name={name} >
        {this.renderNav(files)}
      </NavFolder>
    );
  }

  renderNav(files, level = 0){
    return files
      .sort((a, b) => {
        switch (true) {
          case a.type === 'CODE_DIR' && b.type === 'CODE_DIR':
            return 0;
          case a.type === 'CODE_DIR' && b.type === 'CODE':
            return -1;
          case a.type === 'CODE' && b.type === 'CODE_DIR':
            return 1;
        }
      })
      .map(file => {
        const {appData, name, type, id} = file;
        const {markdown, metadata} = appData;
        switch (type) {
          case 'CODE':
            return this.renderFile(id, metadata.title, markdown);
          case 'CODE_DIR':
            return this.renderDir(id, name, appData);
          default:
            return;
        }
      });
  }

  render() {
    const {appData, actions, id, name, type} = this.props;
    return (
      <Window {...this.props}>
        <ActionBar actions={actions} />
        <div className="code-reader-wrapper">
          <div className="code-reader__nav">
            {this.renderDir(id, name, appData, 0)}
          </div>
          <Code markdown={this.state.markdown}/>
        </div>
      </Window>
    );
  }
}

export default CodeReader;
