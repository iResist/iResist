import React from 'react';
import TwitterFeed from './TwitterFeed.jsx';
import { Twit, TwitDate, ItemUserName, Tweeter, Bird } from './StyledComponents.jsx';

class Tweet extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Twit>
        <div style={{display: 'flex'}}>
          <Bird className="fa fa-twitter"></Bird>
          <ItemUserName>{this.props.username}</ItemUserName>
        </div>
        <div>{this.props.tweet}</div>
        <TwitDate>{this.props.time} </TwitDate>
      </Twit>
    )
  }
}

export default Tweet;
