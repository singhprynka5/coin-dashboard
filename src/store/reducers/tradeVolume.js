import {
    GET_TRADE_VOLUME_SUCCESS,
    GET_TRADE_VOLUME_FAILED,
    SORT_PRICE,
    SORT_VOLUME
} from '../actions/actionType';

const initialState = {};

const tradeVolume = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_TRADE_VOLUME_SUCCESS:
            return { ...state, ...action.payload };
        case GET_TRADE_VOLUME_FAILED:
            return { ...state, ...initialState };
        case SORT_PRICE: {
            const sortable = Object.entries(state)
                .sort(([, a], [, b]) => a.last_traded_price - b.last_traded_price)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
            return sortable;
        }
        case SORT_VOLUME: {
            const sortable = Object.entries(state)
                .sort(([, a], [, b]) => a.volume.volume - b.volume.volume)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
            return sortable;
        }
        default:
            return state;
    }
};

export default tradeVolume;


