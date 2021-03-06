import axios from 'axios';

export const dropPin = (pin, eventId) => {
  return {
    type: 'USER_DROPPED_PIN',
    pin,
    eventId
  };
};

export const votePin = () => {
  return {
    type: 'INSERT TYPE HERE',
    // INSERT OTHER CHANGES HERE
  };
};

export const removePin = () => {
  return {
    type: 'INSERT TYPE HERE',
    // INSERT OTHER CHANGES HERE
  };
};

export const getAllMapsSuccess = (maps) => {
  return {
    type: 'GET_ALL_MAPS_SUCCESS',
    maps
  };
};

export const getAllMaps = () => {
  return dispatch => {
    return axios.get('/api/maps/all')
      .then(maps => {
        return dispatch(getAllMapsSuccess(maps));
      });
  };
};

export const getDayOfMapSuccess = (map) => {
  return {
    type: 'GET_DAY_OF_MAP_SUCCESS',
    map
  };
};

export const getDayOfMap = (eventId) => {
  return dispatch => {
    return axios.get('/api/maps/dayof', {
      params: {
        eventId: eventId
      }
    })
      .then(map => {
        return dispatch(getDayOfMapSuccess(map));
      });
  };
};

export const receivedPin = (pin) => {
  return {
    type: 'RECEIVED_PIN',
    pin
  };
};

export const receivedPinVote = (vote) => {
  return {
    type: 'RECEIVED_PIN_VOTE',
    vote
  };
};

export const receivedPinVoteError = (error) => {
  return {
    type: 'RECEIVED_PIN_VOTE_ERROR',
    error
  };
};
