import React, {Component, PropTypes} from 'react';
import Window from '../../containers/window-container/window-container';
import ActionBar from './code-reader-action-bar';
import NavFolder from './code-reader-nav-folder';

class CodeReader extends Component {
  static propTypes = {
    appData: PropTypes.array.isRequired
  };

  static defaultProps = {
    appData: []
  };

  renderName(name, iconClassName = '') {
    return (
      <div className="code-reader-item-wrapper">
        <div className={`code-reader-item-icon ${iconClassName}`} />
        <div className="code-reader-item-name">{name}</div>
      </div>
    );
  }

  renderFile(id, name, level = 0) {
    return (
      <div
        key={id}
        className={`code-reader__nav-file code-reader__nav-file--${level}`}>
        {this.renderName(name, 'icon-image__CODE')}
      </div>
    );
  }

  renderDir(id, name, files, level = 0) {
    return (
      <NavFolder
        key={id}
        name={name} >
        {this.renderNav(files, level + 1)}
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
        switch (type) {
          case 'CODE':
            return this.renderFile(id, name, level);
          case 'CODE_DIR':
            return this.renderDir(id, name, appData, level);
          default:
            return;
        }
      });
  }

  render() {
    const {appData, actions, id, name, type} = this.props;
    console.log(this.props);

    return (
      <Window {...this.props}>
        <ActionBar actions={actions} />
        <div className="code-reader-wrapper">
          <div className="code-reader__nav">
            {this.renderDir(id, name, appData, 0)}
          </div>
        </div>
      </Window>
    );
  }
}

export default CodeReader;
