import React from 'react';
import { Input } from 'react-bootstrap';
import FeedItem from './FeedItem.jsx';
import SubmitFeedItem from './SubmitFeedItem.jsx';

class DayOfFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '' || 'TEST TEXT',
      url: '' || 'TEST URL.COM',
      credibility: '' || 6, 
      userId: this.props.user.userId,
      username: this.props.user.username,
      feedId: 0, 
      type: '' || 'MESSAGE',
      posts: [],
      feedItemId: ''
    };
  this.handlePost = this.handlePost.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { client, feedItems } = this.props;
    //this.props.getFeeds(this.props.events.activeEvent);

    client.on('postedFeedItemId', (id) => {
      console.log('POSTED FEED ITEM ID FROM COMPO', id[0])
      this.setState({feedItemId: id[0]});
    })

    client.on('newFeedItemFromServer', post => {
      this.props.receiveFeedItem(post);
      console.log('received feed item from server');
    })
  }


  handlePost(e) {
    e.preventDefault();
    let newPost = {
      text: this.state.text,
      type: this.state.type,
      url: this.state.url,
      credibility: this.state.credibility,
      userId: this.state.userId,
      username: this.state.username,
      feedId: this.state.feedId,
      feedItemId: this.state.feedItemId
    };
    this.props.client.emit('newFeedItem', newPost);
    this.state.posts.push(newPost);
    // this.props.postItem(newPost);
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
    console.log('THIS.STATE.FEEDITEM ID', this.state.feedItemId)
    console.log('THIS.STATE FROM DAY OF FEED', this.state)
    let event = _.find(this.props.events.allEvents, event => (event.id === this.props.views.optionalEventId));
    console.log('THIS.PROPS FROM DAHY OF FEED', this.props)
    const feedItems = this.props.feeds.feedItems;
    return (
  
      <div>
        {/*{this.state.posts.map(post => (
          <Input 
            type="textarea"
            name="post"
            placeholder="Post message"
            value={this.state.text}
            //onChange={(e) => this.handleChange(e)}
            //onKeyDown={(e) => this.handleSubmit(e)}
          />
        ))}*/}
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
          feedItems.map(item => <div><b>{item.username}</b> : {item.text}</div>) :
          <div></div>
        }
        <SubmitFeedItem />
        <FeedItem {...this.props}/>

      </div>
    );
  }
}

export default DayOfFeed;
