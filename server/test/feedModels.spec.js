const expect = require('chai').expect;
const feed = require('../../db/models/feed');
const event = require('../../db/models/events');
const user = require('../../db/models/user');
const dbUtils = require('../../db/lib/utils.js');

describe('Feed model test', function() {
  beforeEach(function(done) {
    dbUtils.rollbackMigrate(function() {
      user.insertUser('test-user', function() {
        event.createEvent({
          eventId: '',
          name: 'test-protest',
          userId: 1,
          description: 'just something to test',
          cause: 'testing',
          address: 'oakland',
          date: '2017-06-30',
          timeStart: '10:00',
          timeEnd: '15:00',
          lat: 37.8044557,
          long: -122.2713563,
          protests: [ [ 37.8044557, -122.2713563 ] ],
          zoom: 14,
          timezone: '',
          isEditing: false },
        function(err, data) {
          const post = { 
            eventId: 1,
            type: 'MESSAGE',
            text: 'test post!!!',
            url: '',
            userId: 1,
            username: 'test-user',
            credibility: 0,
            time: 1497493591802 
          };
          feed.postItem(post, function(err, data) {
            done();
          });
        });
      });
    });
  });

  afterEach(function(done) {
    dbUtils.rollback(done);
  });

  it('should be able to post new feed items', (done) => {
    const newPost = { 
      eventId: 1,
      type: 'MESSAGE',
      text: 'Another test post!!!',
      url: '',
      userId: 1,
      username: 'test-user',
      credibility: 0,
      time: 1497493591802 
    };
    feed.postItem(newPost, (err, data) => {
      expect(err).to.equal(null);
      expect(data[0].text).to.equal(newPost.text);
      done();
    })
  })

  it('should be able to get the current number of feed items for an event', (done) => {
    feed.getFeedItemsCollectionLength( 1, (err, data) => {
      expect(err).to.equal(null);
      expect(data[0].count).to.equal('1');
      done();
    })
  })

  it('should be able to vote on a feed item once', (done) => {
    const vote = {
      userId: 1,
      itemId: 1,
      polarity: 1,
    };
    feed.insertFeedItemVote(vote, (err, data) => {
      expect(err).to.equal(null);
      expect(data).to.equal(1);
      done();
    })
  })

  it('should not be able to vote on a feed item twice', (done) => {
    const newVote = {
      userId: 1,
      itemId: 1,
      polarity: 1,
    };
    feed.checkForFeedItemVote(newVote, (err, data) => {
      expect(err).to.not.equal(null);
      done();
    })
  })

  
});