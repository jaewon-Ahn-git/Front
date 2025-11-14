import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { positionAction } from 'store/redux-saga/reducer/base/positionReducer';
import { getPosition } from 'store/api/base/index';
//import { AxiosResponse } from 'axios';

// 직급정보 조회
function* searchPositionSaga() {
  try {
    const { positionList } = yield call(getPosition);
    console.log('api요청으로부터 받아온 직급 리스트: ', positionList);
    yield put(positionAction.POSITION_LIST_SEARCH_FETCH_STATUS(positionList));
  } catch (error) {
    console.log('에러발생:' + error);
  }
}

function* onPositionSaga() {
  console.log('일단 사가로 옴');
  yield takeLatest(positionAction.POSITION_LIST_SEARCH_FETCH_REQUESTED, searchPositionSaga);
}

export default function* positionSaga() {
  yield fork(onPositionSaga);
}
