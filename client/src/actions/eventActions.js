import axios from 'axios';
import { fetchData } from './fetchDataActions';
import { changeView } from './navActions';

export const getEventSuccess = event => {
  return {
    type: 'GET_EVENT_SUCCESS',
    event
  };
};

export const getEventError = error => {
  return {
    type: 'GET_EVENT_ERROR',
    error
  };
};

export const getEvent = eventId => {
  axios
    .get('/api/events/event', {
      params: {
        eventId
      }
    })
    .then(response => {
      dispatch(getEventSuccess(response.data));
    })
    .catch(error => {
      dispatch(getEventError(error));
    });
};

export const getAllEventsSuccess = events => {
  return {
    type: 'GET_ALL_EVENTS_SUCCESS',
    events
  };
};

export const getAllEvents = () => {
  return dispatch => {
    return axios.get('/api/events/all').then(events => {
      return dispatch(getAllEventsSuccess(events));
    });
    // .catch(err => {
    //   return ['ERROR-ERROR', err];
    // });
  };
};

export const createEvent = event => {
  return {
    type: 'RECEIVE_EVENT',
    event
  };
};

export const createEventError = error => {
  return {
    type: 'CREATE_ERROR',
    error
  };
};

export const postEvent = (event, userId) => dispatch => {
  dispatch(changeView('SPINNER'));
  axios
    .post('/api/events/create', event)
    .then(response => {
      dispatch(fetchData(userId, 'DASHBOARD'));
    })
    .catch(error => {
      dispatch(createEventError(error));
    });
};

export const joinEvent = (eventId, userId) => {
  return {
    type: 'JOIN_EVENT',
    eventId,
    userId
  };
};

export const joinEventError = error => {
  return {
    type: 'JOIN_ERROR',
    error
  };
};

export const addUserToEvent = (eventId, userId) => dispatch => {
  axios
    .post('/api/events/join', {
      eventId,
      userId
    })
    .then(response => {
      dispatch(fetchData(userId, 'DASHBOARD'));
    })
    .catch(error => {
      dispatch(joinEventError(error));
    });
};

export const leaveEvent = (eventId, userId) => {
  return {
    type: 'LEAVE_EVENT',
    eventId,
    userId
  };
};

export const leaveEventError = error => {
  return {
    type: 'LEAVE_ERROR',
    error
  };
};

export const removeUserFromEvent = (eventId, userId) => dispatch => {
  axios
    .post('/api/events/leave', {
      eventId,
      userId
    })
    .then(response => {
      dispatch(fetchData(userId, 'DASHBOARD'));
    })
    .catch(error => {
      dispatch(leaveEventError(error));
    });
};

export const updateEventSuccess = updatedEvent => {
  return {
    type: 'UPDATE_EVENT',
    updatedEvent
  };
};

export const updateEventError = error => {
  return {
    type: 'UPDATE_EVENT_ERROR',
    error
  };
};

export const updateEvent = (updatedEvent, userId) => dispatch => {
  dispatch(changeView('SPINNER'));
  axios
    .post('/api/events/update', updatedEvent)
    .then(response => {
      dispatch(fetchData(userId, 'DASHBOARD'));
    })
    .catch(error => {
      dispatch(updateEventError(error));
    });
};

export const deleteEventError = error => {
  return {
    type: 'DELETE_EVENT_ERROR',
    error
  };
};


export const deleteEvent = (eventId) => dispatch => {
  axios.delete('/api/events/delete', {
    params: {
      eventId
    }
  })
  .then(response => {
    dispatch(getAllEvents());
  })
  .catch(error => {
    dispatch(deleteEventError(error));
  });
};

export const setDayOfEvent = (eventId) => {
  return {
    type: 'OPEN_DAY_OF_EVENT',
    eventId
  };
};
