const knex = require('../').knex;
const models = require('./../../db/models');

module.exports.getFeedByEventId = (eventId, pageNumber, cb) => {
  models.FeedItem.where({event_id: eventId})
    .orderBy('id', 'DESC')
    .fetchPage({pageSize: 10, page: pageNumber})
    .then(items => {
      cb(null, items.toJSON());
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.getFeedItemsCollectionLength = (eventId, cb) => {
  knex('feed_items').count('id').where('event_id', eventId)
    .then(count => {
      cb(null, count);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.postItem = (item, cb) => {
  knex('feed_items')
    .insert({event_id: Number(item.eventId), text: item.text, url: item.url, credibility: Number(item.credibility), type: item.type, user_id: Number(item.userId), username: item.username, time: item.time})
    .returning('*')
    .then(insertedPost => {
      cb(null, insertedPost);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.checkForFeedItemVote = (vote, cb) => {
  knex('feed_item_credibility')
    .where({
      user_id: vote.userId,
      feed_item_id: vote.itemId
    })
    .select()
    .then(data => {
      cb(null, data);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.insertFeedItemVote = (vote, cb) => {
  knex('feed_item_credibility')
    .returning('up_down')
    .insert({
      user_id: vote.userId,
      feed_item_id: vote.itemId,
      up_down: vote.polarity
    })
    .then(data => {
      return knex('feed_items')
        .where({
          id: vote.itemId
        })
        .increment('credibility', vote.polarity);
    })
    .then(data => {
      cb(null, data);
    })
    .catch(err => {
      cb(err, null);
    });
};


module.exports.replaceFeedItemVote = (vote, cb) => {
  knex('feed_item_credibility')
    .returning('up_down')
    .where({
      user_id: vote.userId,
      feed_item_id: vote.itemId
    })
    .update({
      up_down: vote.polarity
    })
    .then(data => {
      return knex('feed_items')
        .where({
          id: vote.itemId
        })
        .increment('credibility', (vote.polarity * 2));
    })
    .then(data => {
      cb(null, data);
    })
    .catch(err => {
      cb(err, null);
    });
};
