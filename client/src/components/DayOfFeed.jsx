import React from 'react';
import { Input } from 'react-bootstrap';
import FeedItem from './FeedItem.jsx';
import SubmitFeedItem from './SubmitFeedItem.jsx';
import UploadMedia from './UploadMedia.jsx';

class DayOfFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '' || 'TEST TEXT',
      url: '' || 'TEST URL.COM',
      credibility: '' || 0,
      userId: this.props.user.userId,
      username: this.props.user.username,
      // feedId: '' || 1,
      type: '' || 'MESSAGE',
      feedItemId: ''
    };
    this.handlePost = this.handlePost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { client } = this.props;
    client.on('postedFeedItemId', (id) => {
      this.setState({feedItemId: id[0]});
    });
  }

  handlePost(e) {
    e.preventDefault();
    let newPost = {
      itemId: this.state.feedItemId,
      eventId: this.props.events.activeEvent,
      type: this.state.type,
      text: this.state.text,
      url: this.state.url,
      userId: this.state.userId,
      username: this.state.username,
      credibility: this.state.credibility
    };
    this.props.client.emit('newFeedItem', newPost);
    this.setState({
      text: '',
      url: '',
      credibility: '',
      type: ''
    });
  }

  handleChange(e) {
    this.setState({text: e.target.value });
  }

  render() {
    const feedItems = this.props.feeds.feedItems;
    return (
      <div>
        <h3>Post a message</h3>
        <form onSubmit={this.handlePost}>
          <input
            type="textarea"
            placeholder="What's happening at the protest?"
            value={this.state.text}
            onChange={this.handleChange}
          />
        </form>
        {(feedItems !== undefined && !Object.is(feedItems, {})) ?
          feedItems.map(item => <div><FeedItem username={item.username} text={item.text} key={this.state.feedItemId}/></div>) :
          <div></div>
        }
        <UploadMedia {...this.props} />
      </div>
    );
  }
}

export default DayOfFeed;
