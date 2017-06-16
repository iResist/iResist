import React from 'react';
import { Input } from 'react-bootstrap';
import FeedItem from './FeedItem.jsx';
import UploadMedia from './UploadMedia.jsx';
import TwitterFeed from './TwitterFeed.jsx';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import { DayOfContentWrapper, DayOfTitle, FeedWrapper, Load, TextInput } from './StyledComponents.jsx';
import { Textfit } from 'react-textfit';

class DayOfFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      url: '',
      credibility: '' || 0,
      type: 'MESSAGE',
      pageNumber: 1,
      feedItemCount: 0,
      posts: [],
      wantMoreItems: false
    };
    this.handlePost = this.handlePost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCredChange = this.handleCredChange.bind(this);
  }

  componentDidMount() {
    this.handleLoadItems(this.state.pageNumber++);
    var self = this;
    this.props.client.on('newFeedItemFromServer', insertedPost => {
      this.props.receiveFeedItem(insertedPost);
      let newState = this.state.posts;
      newState.unshift(insertedPost);
      self.setState({posts: newState});
    });

    this.props.client.on('feedItemVoteNotPermitted', (error) => {
      this.props.receiveFeedItemVoteError(error);
    });
  }

  handleLoadItems(pageNumber) {
    axios.get('/api/feed/event', {
      params: {
        eventId: this.props.events.activeEvent,
        pageNumber
      }
    }).then(feedItems => {
      this.setState({posts: this.state.posts.concat(feedItems.data.feedItems)});
    });
  }

  handlePost(e) {
    e.preventDefault();
    let newPost = {
      eventId: this.props.events.activeEvent,
      type: this.state.type,
      text: this.state.text,
      url: this.state.url,
      userId: this.props.user.userId,
      username: this.props.user.username,
      credibility: this.state.credibility,
      time: Date.now()
    };
    this.props.client.emit('newFeedItem', newPost);
    this.setState({
      text: '',
      url: '',
      type: ''
    });
  }

  handleChange(e) {
    this.setState({text: e.target.value });
  }

  handleCredChange(feedItemVote) {
    this.props.client.emit('voteFeedItem', feedItemVote);
  }

  render() {
    console.log('')
    const feedItems = this.props.feeds.feedItems;
    return (
      <div>
      <DayOfContentWrapper>
        <DayOfTitle><Textfit>{this.props.event.name}</Textfit></DayOfTitle>
        <FeedWrapper>
          <div>

            <div style={{display: 'flex', flexDirection: 'row'}}>
            <form onSubmit={this.handlePost}>
              <TextInput
                type="textarea"
                placeholder="What's happening at the protest?"
                value={this.state.text}
                onChange={this.handleChange}
              />
            </form>
            <UploadMedia {...this.props}/>
            </div>

          {
            this.state.posts.map(item =>
              <FeedItem
                username={item.username}
                text={item.text}
                key={item.id}
                username={item.username}
                text={item.text}
                time={item.time}
                userId={this.props.user.userId}
                itemId={item.id}
                credibility={item.credibility}
                handleCredVote={this.handleCredChange}
                receiveVote={this.props.receiveFeedItemVote}
                url={item.url}
                type={item.type}
                errorMsg={item.errorMsg}
                client={this.props.client}/>
            )
          }
          {
          feedItems.length < 10 ?
            <div></div> :
            <Load onClick={() => this.handleLoadItems(this.state.pageNumber++)}>Load More Posts</Load>
          }
        </div>
        </FeedWrapper>
      </DayOfContentWrapper>
      </div>
    );
  }
}

export default DayOfFeed;
