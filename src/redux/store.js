import { configureStore, combineReducers } from '@reduxjs/toolkit';
import missionReducer from './missions/missionsSlice';
import rocketsReducer from './rockets/rocketsSlice';
import dragonsReducer from './dragons/dragonsSlice';

const rootReducer = combineReducers({
  dragons: dragonsReducer,
  mission: missionReducer,
  rockets: rocketsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
