import actionTypes from '../constants/actionTypes';
import {get} from '../util/ajax';

export const fetchEventsData = () => {
  return (dispatch) => {
      return get('/api/getEvents', {json: false})
        .then((response) => {
            return response.body;
        })
        .then((payload) => {
            dispatch(receiveEventsData(payload))
        });
  };
};

const receiveEventsData = (response) => {
    return {
        type:    actionTypes.fetchEvents,
        payload: response
    };
};