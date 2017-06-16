const expect = require('chai').expect;
const event = require('../../db/models/events');
const map = require('../../db/models/map');
const user = require('../../db/models/user');
const dbUtils = require('../../db/lib/utils.js');

const newEvent = {
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
  isEditing: false
};

describe('User model tests', () => {
  beforeEach((done) => {
    dbUtils.rollbackMigrate(() => {
      user.insertUser('test-user', () => {
        map.makeMap(1, 0, 0, (err, data) => {
          map.makeMap(2, 0, 0, (err, data) => {
            event.createEvent(newEvent, (err, data) => {
              done();
            })
          })
        })
      })
    })
  })
  
  afterEach((done) => {
    dbUtils.rollback(done);
  })

  it('should add user who creates an event as the organizer', (done) => {
    user.createEvent(1, 1, (err, data) => {
      event.findAllUsersForEvent(1, (err, eventData) => {
        expect(eventData[0].username).to.equal('test-user');
        expect(eventData[0].type).to.equal('organizer');
        expect(err).to.equal(null);
        done();
      })
    })
  })

})