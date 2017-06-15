const expect = require('chai').expect;
const event = require('../../db/models/events');
const user = require('../../db/models/user');
const dbUtils = require('../../db/lib/utils.js');

describe('Event model tests', () => {
  beforeEach((done) => {
    dbUtils.rollbackMigrate(() => {
      user.insertUser('test-user', () => {
        done();
      })
    })
  })

  afterEach((done) => {
    dbUtils.rollback(done);
  })

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
  
  it('should be able to create an event', (done) =>{
    event.createEvent(newEvent, (err, data) => {
      expect(err).to.equal(null);
      expect(data[0]).to.equal(1);
      done();
    })
  })
  
  it('should be able to delete an event', (done) =>{
    event.createEvent(newEvent, (err, data) => {
      event.deleteEventById(data[0], (err, data) => {
        expect(err).to.equal(null);
        done();
      })
    })
  })

  it('should increment attendee count when a user joins an event', (done) =>{
    event.createEvent(newEvent, (err, eventId) => {
      event.findEventData(eventId[0], (err, eventInfo) => {
        expect(eventInfo[0].attendee_count).to.equal(1);
        user.insertUser('theFonz', (err, fonzData) => {
          event.joinEvent(eventId[0], 2, 'attendee', (err, data) => {
            event.incrementAttendeeCount(eventId[0], (err, data) => {
              event.findEventData([eventId[0]], (err, eventInfo) => {
                expect(err).to.equal(null);
                expect(eventInfo[0].attendee_count).to.equal(2);
                done();
              })
            })
          })
        })
      })
    })
  })

  it('should decrement attendee count when a user leaves an event', (done) => {
    event.createEvent(newEvent, (err, eventId) => {
      event.findEventData(eventId[0], (err, eventInfo) => {
        expect(eventInfo[0].attendee_count).to.equal(1);
        user.insertUser('theFonz', (err, fonzData) => {
          event.joinEvent(eventId[0], 2, 'attendee', (err, data) => {
            event.incrementAttendeeCount(eventId[0], (err, data) => {
              event.leaveEvent(eventId[0], 2, (err, data) => {
                event.decrementAttendeeCount(eventId[0], (err, data) => {
                  event.findEventData([eventId[0]], (err, eventInfo) => {
                  expect(err).to.equal(null);
                  expect(eventInfo[0].attendee_count).to.equal(1);
                  done();
                  })
                })
              })
            })
          })
        })
      })
    })
  })

})
