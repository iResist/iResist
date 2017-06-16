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

  it('should insert a new user', (done) => {
    user.insertUser('theFonz', (err, data) => {
      user.insertUser('yujin', (err, data) => {
        user.insertUser('batman', (err, data) => {
          user.allUsers((err, allUsers) => {
            expect(allUsers.length).to.equal(4);
            expect(err).to.equal(null);
            done();
          })
        })
      })
    })
  })

  it('should return all registered users', (done) => {
    user.insertUser('theFonz', (err, data) => {
      user.insertUser('yujin', (err, data) => {
        user.insertUser('batman', (err, data) => {
          user.allUsers((err, allUsers) => {
            expect(allUsers[0].username).to.equal('test-user');
            expect(allUsers[1].username).to.equal('theFonz');
            expect(allUsers[2].username).to.equal('yujin');
            expect(allUsers[3].username).to.equal('batman');
            expect(err).to.equal(null);
            done();
          })
        })
      })
    })
  })

  it('should add a new user to an event with role of "attendee"', (done) => {
    event.joinEvent(1, 1, 'attendee', (err, data) => {
      event.findAllUsersForEvent(1, (err, eventData) => {
        expect(eventData[0].username).to.equal('test-user');
        expect(eventData[0].type).to.equal('attendee');
        expect(err).to.equal(null);
        done();
      })
    })
  })

  it('should add a new user to an event with role of "organizer"', (done) => {
    event.joinEvent(1, 1, 'organizer', (err, data) => {
      event.findAllUsersForEvent(1, (err, eventData) => {
        expect(eventData[0].username).to.equal('test-user');
        expect(eventData[0].type).to.equal('organizer');
        expect(err).to.equal(null);
        done();
      })
    })
  })

})