const knex = require('../').knex;
const formatDate = require('../lib/formatDate');



module.exports.findAllEvents = (cb) => {

  knex('events')
    .join('maps', 'events.id', 'maps.event_id')
    .select('events.id', 'events.name', 'events.description', 'events.cause', 'events.address', 'events.attendee_count', 'events.time', 'events.duration', 'maps.id as mapId')
    .then(data => {
      console.log('RESPONSE IN ALL EVENTS: ', data)
      cb(null, data);
    })
    .catch(e => {
      console.log('ERROR IN ALL EVENTS: ', e)
      cb(e, null);
    });
};

module.exports.findAllAttendees = (cb) => {
  knex.select().from('users_events')
    .then(data => {
      cb(null, data);
    })
    .catch(e => {
      cb(e, null);
    });
};

module.exports.findEventAttendees = (eventId, cb) => {
  knex.select().from('users_events')
    .where('event_id', eventId)
    .then(data => {
      console.log('ALL ATTENDEES: ', data)
      cb(null, data);
    })
    .catch(e => {
      cb(e, null);
    });
};

module.exports.findEventData = (eventIds, cb) => {
  knex.select().from('events').where('id', 'in', eventIds)
    .then(data => {
      cb(null, data);
    })
    .catch(e => {
      cb(e, null);
    });
};


module.exports.createEvent = (data, cb) => {
  const startHours = data.timeStart.split(':')[0];
  const startMinutes = data.timeStart.split(':')[1];
  const endHours = data.timeEnd.split(':')[0];
  const endMinutes = data.timeEnd.split(':')[1];
  const eventStart = formatDate(data.lat, data.long, data.date, startHours, startMinutes);
  const eventEnd = formatDate(data.lat, data.long, data.date, endHours, endMinutes);

  const values = {
    name: data.name,
    description: data.description,
    cause: data.cause,
    address: data.address,
    attendee_count: 1,
    time: eventStart,
    duration: eventEnd - eventStart
  };

  knex('events')
    .returning('id')
    .insert(values)
    .then(data => {
      cb(null, data);
    })
    .catch(e => {
      cb(e, null);
    });
};


module.exports.incrementAttendeeCount = (eventId, cb) => {
  knex('events').where('id', '=', eventId).increment('attendee_count', 1)
    .then(data => {
      cb(null, data);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.decrementAttendeeCount = (eventId, cb) => {
  knex('events').where('id', '=', eventId).decrement('attendee_count', 1)
    .then(data => {
      cb(null, data);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.joinEvent = (eventId, userId, type, cb) => {
  knex('users_events')
    .insert({user_id: userId, event_id: eventId, type: type})
    .then(data => {
      cb(null, data);
    })
    .catch(err => {
      console.log('ERROR FROM MODELS/JOINEVENT:', err);
      cb(err, null);
    });
};

module.exports.leaveEvent = (eventId, userId, cb) => {
  knex('users_events').where({
    user_id: userId,
    event_id: eventId
  }).del()
  .then(data => {
    cb(null, data);
  })
  .catch(e => {
    console.log('ERROR FROM MODELS/LEAVEEVENT: ', e);
    cb (e, null);
  });
};

module.exports.findAllUsersForEvent = (eventId, cb) => {
  knex.raw(
    `
    SELECT users.id, users.username, users.credibility, users_events.type FROM users
    INNER JOIN users_events ON users.id = users_events.user_id
    INNER JOIN events ON events.id = users_events.event_id
    WHERE events.id = ?;
    `, eventId
    )
    .then(data => {
      cb(null, data.rows);
    })
    .catch(err => {
      cb(err, null);
    });
};


module.exports.updateEventById = (updatedEvent, cb) => {

  const startHours = updatedEvent.timeStart.split(':')[0];
  const startMinutes = updatedEvent.timeStart.split(':')[1];
  const endHours = updatedEvent.timeEnd.split(':')[0];
  const endMinutes = updatedEvent.timeEnd.split(':')[1];
  const eventStart = formatDate(updatedEvent.lat, updatedEvent.long, updatedEvent.date, startHours, startMinutes);
  const eventEnd = formatDate(updatedEvent.lat, updatedEvent.long, updatedEvent.date, endHours, endMinutes);

  knex('events')
    .where('id', '=', updatedEvent.eventId)
    .update({
      name: updatedEvent.name,
      description: updatedEvent.description,
      cause: updatedEvent.cause,
      address: updatedEvent.address,
      time: eventStart,
      duration: eventEnd - eventStart
    })
    .then(data => {
      cb(null, data);
    })
    .catch(error => {
      console.log('ERROR FROM UPDATE EVENTS QUERY', error);
      cb(error, null);
    });
};

module.exports.deleteEventById = (eventId, cb) => {
  console.log('EVENT ID FROM DELETE EVENT QUERY', eventId);
  knex('maps')
    .where('event_id', eventId)
    .del()
    .then(() => (
      knex('users_events')
    ))
    .then(() => (
      knex('feed')
        .where('event_id', eventId)
        .del()
    ))
    .then(() => (
      knex('users_events')
        .where('event_id', eventId)
        .del()
    ))
    .then(() => {
      knex('events')
        .where('event_id', eventId)
        .del();
    })
    .then(data => {
      cb(null, data);
    })
    .catch(error => {
      console.log('DELETE EVENT ERROR', error);
      cb(error, null);
    });
};
