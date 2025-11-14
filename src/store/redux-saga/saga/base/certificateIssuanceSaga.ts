import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { certificateIssuanceAction } from 'store/redux-saga/reducer/base/certificateIssuanceReducer';
import {searchEmpDeatilInfo } from 'store/redux-saga/api/base';
import { typeAction } from 'types/attendance/types';
import { AxiosResponse } from 'axios';

// 직급정보 조회
function* searchEmpDetailSaga(action: typeAction) {
  console.log('saga로 받은 empCode: ' + action.payload);
  try {
    const response: AxiosResponse = yield call(searchEmpDeatilInfo, action.payload);
    console.log('api요청으로부터 받아온 직원 상세 리스트: ', response.data.list);
    yield put(certificateIssuanceAction.EMP_DETAIL_LIST_SEARCH_FETCH_STATUS(response.data.list));
  } catch (error) {
    console.log('에러발생:' + error);
  }
}

function* onPositionSaga() {
  //console.log('일단 사가로 옴');
  yield takeLatest(certificateIssuanceAction.EMP_DETAIL_LIST_SEARCH_FETCH_REQUESTED, searchEmpDetailSaga);
}

export default function* positionSaga() {
  yield fork(onPositionSaga);
}
