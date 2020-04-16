import Immutable from "immutable";
import actionTypes from '../constants/actionTypes';

export default (state = Immutable.fromJS([]), action) => {
    switch (action.type) {
        case actionTypes.fetchEvents:
            return Immutable.fromJS(action.payload);
        default:
            return state
    }
}