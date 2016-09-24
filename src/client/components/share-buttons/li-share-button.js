import React, {Component, PropTypes} from 'react';

class LinkedInShareButton extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  share(url) {
    const encodedURI = encodeURIComponent(url);
    window.open(
      `https://www.linkedin.com/cws/share?url=${encodedURI}`,
      '_blank', 'width=600,height=400'
    );
  }

  render() {
    const {url} = this.props;
    return (
      <div
        className="li-share-btn"
        onClick={() => this.share(url)}>
        Share on LinkedIn
      </div>
    )
  }
}

export default LinkedInShareButton;
