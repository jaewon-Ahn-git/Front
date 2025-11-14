import { hobongAction } from 'store/redux-saga/reducer/base/hobongReducer';
import { takeEvery, all, call, put } from 'redux-saga/effects';
import { typeAction } from 'types/attendance/types';
import { AxiosResponse } from 'axios';
import { getHobongList, insertHobongList, updatePercentageHobongList, updateFixedHobongList } from 'store/redux-saga/api/base';

//type dailyAttendRequest = { dayAttdlist: []; errorMsg: ''; errorCode: 0; empList: [] };

// generator 함수는 yield 안하면은 해당 라인의 코드 실행 안함
// console.log()는 예외인거 같다.

export function* hobongSearchSaga(action: typeAction) {
  yield console.log('This is Saga!! hobongSearchSaga called!!!', action.payload);
  const { payload } = action;
  const response: AxiosResponse = yield call(getHobongList, payload);
  console.log('호봉조회 상태: ', response);
  yield put(hobongAction.HOBONG_LIST_SEARCH_FETCH_STATUS(response.data.hobongList));
}

export function* hobongInsertSaga(action: typeAction) {
  yield console.log('This is Saga!! hobongInsertSaga called!!!', action.payload);
  const { payload } = action;
  const response: AxiosResponse = yield call(insertHobongList, payload);
  console.log('호봉등록 상태: ', response);
  yield put(hobongAction.HOBONG_LIST_SEARCH_FETCH_REQUESTED(payload.positionCode));
}

export function* hobongPercentageUpdateSaga(action: typeAction) {
  yield console.log('This is Saga!! hobongPercentageUpdateSaga called!!!', action.payload);
  const { payload } = action;
  const response: AxiosResponse = yield call(updatePercentageHobongList, payload);
  console.log('호봉정률인상 상태: ', response);
  yield put(hobongAction.HOBONG_LIST_SEARCH_FETCH_REQUESTED(payload.positionCode));
}

export function* hobongFixedUpdateSaga(action: typeAction) {
  yield console.log('This is Saga!! hobongFixedUpdateSaga called!!!', action.payload);
  const { payload } = action;
  const response: AxiosResponse = yield call(updateFixedHobongList, payload);
  console.log('호봉정액인상 상태: ', response);
  yield put(hobongAction.HOBONG_LIST_SEARCH_FETCH_REQUESTED(payload.positionCode));
}

// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
export function* onHobongSaga() {
  yield takeEvery(hobongAction.HOBONG_LIST_SEARCH_FETCH_REQUESTED, hobongSearchSaga);
  yield takeEvery(hobongAction.HOBONG_LIST_INSERT_FETCH_REQUESTED, hobongInsertSaga);
  yield takeEvery(hobongAction.HOBONG_LIST_PERCENTAGE_UPDATE_FETCH_REQUESTED, hobongPercentageUpdateSaga);
  yield takeEvery(hobongAction.HOBONG_LIST_FIXED_UPDATE_FETCH_REQUESTED, hobongFixedUpdateSaga);
}

export default function* hobongSaga() {
  yield all([call(onHobongSaga)]);
}
