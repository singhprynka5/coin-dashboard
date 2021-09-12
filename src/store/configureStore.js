import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from 'redux-thunk';


const config = {
    key: "coin-store",
    storage,
    whitelist: ["favourites"],
};

const persistedReducer = persistReducer(config, rootReducer);

export const configureStore = (initialState) => {
    let store = createStore(persistedReducer, initialState, applyMiddleware(thunkMiddleware));
    let persistor = persistStore(store);
    return { store, persistor };
}