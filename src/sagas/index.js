import UsersSagas from './users';
import { all } from 'redux-saga/effects'

// allows all these forked processes to be created in paralel. 'All' is lile promise.all() of javascript. They're running in paralel and we're waiting all to resolve
export default function* rootSaga() {
  yield all([
    ...UsersSagas
  ]);
};