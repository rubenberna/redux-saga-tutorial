import { takeEvery, call, fork, put, takeLatest, take } from 'redux-saga/effects'
import * as actions from '../actions/users'
import * as api from '../api/users'

function* getUsers(){
  try {
    // call is asynchronous and the subsequent code will only run once the call resolves
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({
      items: result.data.data
    }))  
  } catch (error) {
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }))
  }
}

// Whenever we're watching the redux actions below (takeEvery, takeLatest), the redux action is passed into the worker saga that we specify
function* createUser(action){
  try {
    yield call(api.createUser, {firstName: action.payload.firstName, lastName: action.payload.lastName});
    yield call(getUsers);
  } catch (error) {
    yield put(actions.usersError({
      error: 'An error occurred when trying to create the user'
    }))
  }
}

function* deleteUser({userId}) {  
  try {
    yield call(api.deleteUser, userId)
    yield call(getUsers)
  } catch (error) {
    yield put(actions.usersError({
      error: 'An error occurred when trying to delete the user'
    }))
  }
}

// Constantly watches when an action is being dispatched and calls a 'worker' saga -- under the hood it's a while(true) loop 
function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

function* watchDeleteUserRequest() {
  
  // While true means, until this action resolves, it will ignore new requests that may have been dispatched in the meantime
  while (true) {
    const action = yield take(actions.Types.DELETE_USER_REQUEST) // take is a lower level level that simply returns the action that was dispatched
    // now we call the worker saga
    yield call(deleteUser, { userId: action.payload.userId})
  }
}

const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest)
]

export default usersSagas