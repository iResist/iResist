export const maps = (state = {}, action) => {
  switch (action.type) {
  case 'GET_ALL_MAPS_SUCCESS': {
    return Object.assign({}, state, {
      allMaps: action.maps.data
    });
  }
  case 'GET_DAY_OF_MAP_SUCCESS': {
    let newState = Object.assign({}, state);
    if (action.map.data.allPins.length > 0) {
      const targetPin = action.map.data.allPins[0];
      const targetMap = action.map.data[targetPin].map_id;
      newState.allMaps[targetMap].pins = action.map.data.allPins;
    }
    return Object.assign({}, newState, {
      pins: action.map.data
    });
  }
  case 'RECEIVED_PIN': {
    const pinId = action.pin.allPins[0];
    const mapId = action.pin[pinId].map_id;
    let newAllPins = [...state.pins.allPins];
    newAllPins.push(pinId);
    return Object.assign({}, state, {
      pins: {...state.pins, allPins: newAllPins, [pinId]: action.pin[pinId]},
      allMaps: {...state.allMaps, [mapId]: {...state.allMaps[mapId], pins: newAllPins}}
    });
  }
  case 'RECEIVED_PIN_VOTE': {
    let newState = Object.assign({}, state);
    newState.pins[action.vote.pinId].credibility += action.vote.change;
    return newState;
  }
  case 'RECEIVED_PIN_VOTE_ERROR': {
    let newState = Object.assign({}, state);
    newState.pins[action.error.pinId].errorMsg = action.error.msg;
    return newState;
  }
  default:
    return state;
  }
};
