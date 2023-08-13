import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import homeSlice from '../reducerSlice/homeSlice';
import musicSlice from '../reducerSlice/musicSlice';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistMusicConfig = {
    ...persistConfig,
    key: 'music',
    whitelist: ['currentSongId', 'currentAlbumId', 'volume', 'currentSongData', 'recentSongs', 'search', 'weekChart'],
};

const rootReducer = combineReducers({
    home: homeSlice,
    music: persistReducer(persistMusicConfig, musicSlice),
});

export default rootReducer;
