import { combineReducers } from 'redux';

// import popupReducer from './popupReducer';
import meReducer from './meReducer';
import usersReducer from './usersReducer';
import devicesReducer from './devicesReducer';
import activeEventsReducer from './activeEventsReducer';

export default combineReducers({
  // popup: popupReducer,
  me: meReducer,
  users: usersReducer,
  devices: devicesReducer,
  activeEvents: activeEventsReducer
});
