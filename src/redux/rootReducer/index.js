import { combineReducers } from 'redux';
import reducerSlice from '../reducerSlice/reducerSlice';

const rootReducer = combineReducers({
    reducer: reducerSlice,
});

export default rootReducer;
