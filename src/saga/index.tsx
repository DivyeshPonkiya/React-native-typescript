import {all} from 'redux-saga/effects';
import LoginSagas from '@/saga/Login';

export default function* rootSaga() {
  yield all([...LoginSagas]);
}
