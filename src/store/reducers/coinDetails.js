import {
    GET_COIN_DETAILS_SUCCESS,
    GET_COIN_DETAILS_FAILED
} from '../actions/actionType';

const initialState = {};

const coinDetails = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_COIN_DETAILS_SUCCESS:
            return { ...state, ...action.payload };
        case GET_COIN_DETAILS_FAILED:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export default coinDetails;
