import React, {Component, PropTypes} from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: new Date()
    };
    this.getNewTime = this.getNewTime.bind(this);
  }
  componentWillMount() {
    if (typeof window !== 'undefined') {
      setInterval(this.getNewTime, 60000);
    }
  }

  getNewTime() {
    this.setState({timestamp: new Date()});
  }

	render() {
    const {timestamp} = this.state;
    const H = timestamp.getHours();
    const h = H % 12;
    const m = timestamp.getMinutes();
    const mm = m < 10 ? `0${m}` : m;
    const p = H < 12 ? 'AM' : 'PM';
    const hh = h === 0 && p === 'PM' ? 12 : h;

    return (
  		<div className="navigation-bar--clock">{`${hh}:${mm} ${p}`}</div>
    );
	}
}

export default Clock;
