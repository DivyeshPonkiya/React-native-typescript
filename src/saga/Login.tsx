import asyncKeys from '@/constants/AsyncKeys';
import {strings} from '@/localization';
import Apis from '@/networking/apis';
import LoginActions, {LoginTypes} from '@/reducers/LoginReducer';
import {storeData} from '@/storage';
import {showToast} from '@/utils/helper';
import {call, put, takeLatest} from 'redux-saga/effects';

const loginApi = Apis.LoginRequest();

function* loginRequest(api: any, {payload}: any): Generator<any, void, any> {
  try {
    const response = yield call(api.login, {payload});
    if (response.status === 200) {
      yield put(LoginActions.loginSuccess(response?.data));

      const auth_token = `Token ${response?.data?.token}`;
      storeData(asyncKeys.accessToken, auth_token);
    } else {
      if (response?.status === 401) {
        showToast(strings.tokenExpired, {
          position: 'bottom',
          bottomOffset: 60,
        });
        yield put(LoginActions.loginFailure(strings.SomthingWenttoWrong));
      } else if (response?.status === 400) {
        const errMessage = response?.data;
        yield put(LoginActions.loginFailure(strings.SomthingWenttoWrong));
        if (errMessage.non_field_errors !== undefined) {
          if (errMessage.non_field_errors.length !== 0) {
            const non_field_errors = errMessage.non_field_errors;
            const dataString = non_field_errors.join(', ');

            showToast(dataString, {
              position: 'bottom',
              bottomOffset: 60,
            });
          }
        } else {
          showToast(strings.SomthingWenttoWrong, {
            position: 'bottom',
            bottomOffset: 60,
          });
        }
      } else {
        showToast(strings.SomthingWenttoWrong, {
          position: 'bottom',
          bottomOffset: 60,
        });
        yield put(LoginActions.loginFailure(strings.SomthingWenttoWrong));
      }
    }
  } catch (error) {
    console.error('Error in loginRequest:', error);
    yield put(LoginActions.loginFailure(strings.SomthingWenttoWrong));
  }
}

function* signUpRequest(api: any, {payload}: any): Generator<any, void, any> {
  try {
    const response = yield call(api.SignUp, {payload});
    if (response.status === 200) {
      yield put(LoginActions.signupSuccess(response?.data));
    } else {
      if (response?.status === 401) {
        yield put(LoginActions.signupFailure(strings.SomthingWenttoWrong));
      } else if (response?.status === 400) {
        const errMessage = response?.data;
        yield put(LoginActions.signupFailure(strings.SomthingWenttoWrong));
        if (errMessage.mobile !== undefined) {
          if (errMessage.mobile.length !== 0) {
            const mobileErrors = errMessage.mobile;
            const dataString = mobileErrors.join(', ');

            showToast(dataString, {
              position: 'bottom',
              bottomOffset: 60,
            });
          }
        } else {
          showToast(strings.SomthingWenttoWrong, {
            position: 'bottom',
            bottomOffset: 60,
          });
        }
      } else {
        showToast(strings.SomthingWenttoWrong, {
          position: 'bottom',
          bottomOffset: 60,
        });
        yield put(LoginActions.signupFailure(strings.SomthingWenttoWrong));
      }
    }
  } catch (error) {
    console.error('Error in signUpRequest:', error);
    yield put(LoginActions.signupFailure(strings.SomthingWenttoWrong));
  }
}

function* logoutRequest(api: any): Generator<any, void, any> {
  try {
    const response = yield call(api.logout);
    if (response.status === 200) {
      yield put(LoginActions.autoLogoutData());
    }
  } catch (error) {
    console.error('Error in logoutRequest:', error);
  }
}

export default [
  takeLatest(LoginTypes.LOGIN_REQUEST, loginRequest, loginApi),
  takeLatest(LoginTypes.SIGNUP_REQUEST, signUpRequest, loginApi),
  takeLatest(LoginTypes.AUTO_LOGOUT_DATA, logoutRequest, loginApi),
];
