import { all } from 'redux-saga/effects'

import userSagas from './user'
import courseSagas from './course'

export default function* rootSaga() {
  yield all([
    userSagas(),
    courseSagas(),
  ])
}
