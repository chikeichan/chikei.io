import React, {Component, PropTypes} from 'react';

class FacebookShareButton extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  share(url) {
    const encodedURI = encodeURIComponent(url);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedURI}&src=sdkpreparse`,
      '_blank', 'width=600,height=400'
    );
  }

  render() {
    const {url} = this.props;
    return (
      <div
        className="fb-share-btn"
        onClick={() => this.share(url)}>
        Share on Facebook
      </div>
    )
  }
}

export default FacebookShareButton;
