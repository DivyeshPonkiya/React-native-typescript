import {combineReducers} from 'redux';
import {loginReducer} from '@/reducers/LoginReducer';

export const rootReducer = combineReducers({
  login: loginReducer,
});
