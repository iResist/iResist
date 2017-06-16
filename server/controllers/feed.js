const models = require('../../db/models');
const formatFeedItems = require('../../db/lib/formatFeedItem');
const formatFeed = require('../../db/lib/formatFeed');

module.exports.getAllFeed = (req, res) => {
  models.Feed.allFeeds((err, feed) => {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, feed);
    }
  });
};

module.exports.getEventFeed = (req, res) => {
  models.Feed.getFeedByEventId(req.query.eventId, req.query.pageNumber, (err, feedItems, collectionLength) => {
    if (err) {
      res.send(500, err);
    } else {
      models.Feed.getFeedItemsCollectionLength(req.query.eventId, (err, collectionLength) => {
        if (err) {
          res.send(500, err);
        } else {
          const feeds = formatFeed(feedItems);
          const feed_items = formatFeedItems(feedItems);
          res.send(200, {feeds: feeds, feedItems: feed_items, collectionLength: collectionLength });
        }
      });
    }
  });
};

module.exports.postFeedItem = (client, io, event, post) => {
  models.Feed.postItem(post, (err, insertedPost) => {
    if (err) {
      console.error(err);
    } else {
      // io.to(event).emit('postedFeedItemId', insertedPost[0].id);
      io.to(event).emit('newFeedItemFromServer', insertedPost[0]);
    }
  });
};

module.exports.uploadMedia = (req, res) => {
  console.log('got an upload', req.file);

  res.send(200, req.file);
};

module.exports.voteFeedItem = (client, io, event, vote) => {
  models.Feed.checkForFeedItemVote(vote, (err, responseVote) => {
    if (err) {
      // emit some sort of err
      console.log(err);
    } else {
      if (responseVote.length === 0) {
        models.Feed.insertFeedItemVote(vote, (err, insertResponseVote) => {
          if (err) {
            console.log('ERR FROM INSRT FEED ITEM VOTE', err);
          } else {
            io.to(event).emit('newFeedItemVote', {
              itemId: vote.itemId,
              change: vote.polarity
            });
          }
        });
      } else if (responseVote[0].up_down !== vote.polarity) {
        models.Feed.replaceFeedItemVote(vote, (err, replaceResponseVote) => {
          if (err) {
            console.log('ERR FROM REPLACE FEED ITEM VOTE', err);
          } else {
            io.to(event).emit('newFeedItemVote', {
              itemId: vote.itemId,
              change: vote.polarity * 2
            });
          }
        });
      } else {
        client.emit('feedItemVoteNotPermitted', {
          itemId: vote.itemId,
          msg: 'You have already voted on that!'
        });
      }
    }
  });
};

