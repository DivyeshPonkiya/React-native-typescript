import {createActions, createReducer} from 'reduxsauce';
import Immutable, {ImmutableObject} from 'seamless-immutable';
import {storeData} from '@/storage';
import {AsyncKeys} from '@/constants';

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  loginRequest: ['payload'],
  loginSuccess: ['data'],
  loginFailure: ['error'],
  signupRequest: ['payload'],
  signupSuccess: ['data'],
  signupFailure: ['error'],
  autoLogoutData: ['data'],
});

export const LoginTypes = Types;

const LoginActions = Creators;

export default LoginActions;

/* ------------- Initial State ------------- */
interface LoginState {
  fetching: boolean;
  error: any; // Change this to a more specific error type if possible
  data: any; // Change this to your specific data type
  signUp: any; // Change this to your specific sign-up data type
  userSession: any; // Change this to your specific user session data type
  session: boolean;
}

const INITIAL_STATE: ImmutableObject<LoginState> = Immutable({
  fetching: false,
  error: null,
  data: null,
  signUp: null,
  userSession: null,
  session: false,
});

/* ------------- Reducers ------------- */
export const request = (state: ImmutableObject<LoginState>) =>
  state.merge({fetching: true, error: null as any});

export const success = (
  state: ImmutableObject<LoginState>,
  action: {data: any}, // Change this to your specific data type
) => {
  const {data} = action;

  return state.merge({
    fetching: false,
    error: null as any,
    data: data,
    userSession: data,
    session: true,
  });
};

export const signUpsuccess = (
  state: ImmutableObject<LoginState>,
  action: {data: any}, // Change this to your specific sign-up data type
) => {
  const {data} = action;

  return state.merge({
    fetching: false,
    error: null as any,
    signUp: data,
  });
};

export const autoLogoutData = (
  state: ImmutableObject<LoginState>,
): ImmutableObject<LoginState> => {
  storeData(AsyncKeys.accessToken, '');
  return state.merge({
    fetching: false,
    error: null as any,
    userSession: null as any,
    data: null as any,
    session: false,
  });
};

export const failure = (
  state: ImmutableObject<LoginState>,
  action: {error: any}, // Change this to a more specific error type if possible
) => {
  const {error} = action;

  return state.merge({fetching: false, error});
};

/* ------------- Hookup Reducers To Types ------------- */
export const loginReducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.SIGNUP_REQUEST]: request,
  [Types.SIGNUP_SUCCESS]: signUpsuccess,
  [Types.SIGNUP_FAILURE]: failure,
  [Types.AUTO_LOGOUT_DATA]: autoLogoutData,
});
