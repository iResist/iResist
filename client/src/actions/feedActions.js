import axios from 'axios';

export const postItem = () => {
  return {
    type: 'INSERT TYPE HERE',
    // INSERT OTHER CHANGES HERE
  };
};

export const voteItem = () => {
  return {
    type: 'INSERT TYPE HERE',
    // INSERT OTHER CHANGES HERE
  };
};

export const deleteItem = () => {
  return {
    type: 'INSERT TYPE HERE',
    // INSERT OTHER CHANGES HERE
  };
};

export const getFeedItemsSuccess = (feedItems) => {
  return {
    type: 'GET_FEED_ITEMS_SUCCESS',
    feedItems
  };
};


export const getFeedItemsError = (error) => {
  return {
    type: 'GET_FEED_ITEMS_ERROR',
    error
  };
};

export const getFeeds = (eventId, pageNumber) => dispatch => {
  axios.get('/api/feed/event', {
    params: {
      eventId,
      pageNumber
    }
  })
  .then((feedItems) => {
    return dispatch(getFeedItemsSuccess(feedItems));
  })
  .catch(error => {
    dispatch(getFeedItemsError(error));
  });
};

export const receiveFeedItem = (item) => {
  return {
    type: 'RECEIVE_FEED_ITEM',
    item
  };
};

export const receiveFeedItemVote = (vote) => {
  return {
    type: 'RECEIVE_FEED_ITEM_VOTE',
    vote
  };
};

export const receiveFeedItemVoteError = (error) => {
  return {
    type: 'RECEIVE_FEED_ITEM_VOTE_ERROR',
    error
  };
};

