import axios from "axios";
import {
    GET_COIN_DETAILS_SUCCESS,
    GET_COIN_DETAILS_FAILED,
    GET_TRADE_VOLUME_SUCCESS,
    GET_TRADE_VOLUME_FAILED,
    TOGGLE_FAVOURITE
} from "./actionType";

let apiUrl = "https://bitbns.com";

export const getCoinDetails = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${apiUrl}/jugApi/coinParams.json`);
            dispatch(fetchStatus(response.data[0].data[0], GET_COIN_DETAILS_SUCCESS));
        } catch (err) {
            dispatch(
                fetchStatus(
                    (err && err.message) ||
                    "Something went wrong. Please try again later.",
                    GET_COIN_DETAILS_FAILED
                )
            )
        }
    }
};

export const getTradeVolume = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${apiUrl}/order/getTickerWithVolume`);
            dispatch(fetchStatus(response.data, GET_TRADE_VOLUME_SUCCESS));
        } catch (err) {
            dispatch(
                fetchStatus(
                    (err && err.message) ||
                    "Something went wrong. Please try again later.",
                    GET_TRADE_VOLUME_FAILED
                )
            )
        }
    }
};

export const toggleFav = (coin, status) => {
    return async dispatch => {
        dispatch(fetchStatus({coin, status}, TOGGLE_FAVOURITE));
    }
};

export const sortCoins = (type) => {
    return async dispatch => {
        dispatch(fetchStatus("", type));
    }
};

export const fetchStatus = (res, type) => {
    return {
        type: type,
        payload: res
    };
};