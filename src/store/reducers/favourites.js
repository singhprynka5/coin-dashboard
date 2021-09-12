import {
    TOGGLE_FAVOURITE
} from '../actions/actionType';

const initialState = {};

const favourites = (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_FAVOURITE: {
            return {
                ...state,
                [action.payload.coin]: action.payload.status ? false : true
            }
        }
        default:
            return state;
    }
};

export default favourites;


