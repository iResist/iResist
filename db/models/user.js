const knex = require('../').knex;

module.exports.user = (userId, cb) => {
  knex.select().from('users').where('id', userId)
    .then(data => {
      cb(null, data);
    })
    .catch(e => {
      cb(e, null);
    });
};

module.exports.allUsers = (cb) => {
  knex.select().from('users')
    .then(data => {
      cb(null, data);
    })
    .catch(e => {
      cb(e, null);

    });
};

module.exports.insertUser = (userName, cb) => {
  knex('users').insert({username: userName, credibility: 0}).then(data => { if (cb) { cb(); } });
};

module.exports.createEvent = (eventId, userId, cb) => {
  knex('users_events').returning('event_id')
    .insert({
      user_id: userId,
      event_id: eventId,
      type: 'organizer'
    })
  .then(data => {
    cb(null, data);
  })
  .catch(e => {
    console.log('ERROR IS: ', e);
    cb(e, null);
  });
};

module.exports.getEventIdForAllOrganizers = (cb) => {
  knex('users')
    .join('users_events', 'users.id', 'users_events.user_id')
    .select('users.id', 'users.username', 'users_events.event_id')
    .where('users_events.type', 'organizer')
    .then(data => {
      cb(null, data);
    })
    .catch(e => {
      console.log('ERROR IS: ', e);
      cb(e, null);
    });
};

module.exports.getUserEvents = (userId, cb) => {
  knex.select('event_id', 'type')
    .from('users_events')
    .where('user_id', userId)
    .then(data => {
      cb(null, data);
    })
    .catch(e => {
      cb(e, null);
    });
};
