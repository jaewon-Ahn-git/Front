import { empCardAction } from '../slices/empCardReducer';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getEmpCard, getEmpCardModify } from 'store/redux-saga/api/base';

// generator 함수는 yield 안하면은 해당 라인의 코드 실행 안함
// console.log()는 예외인거 같다.

type typeAction = { payload: any; type: string };

export function* empCardActionSaga(action: typeAction) {
  yield console.log('empCardActionSaga called!!! ', action.payload);
  const { payload } = action;
  const response: AxiosResponse = yield call(getEmpCard, payload);
  console.log('data from empCardActionSaga:', response);
  yield put(empCardAction.EMP_CARD_STATUS(response.data.empCard));
}

//수정해야함~~
export function* empCardUpdateActionSaga(action: typeAction) {
  console.log('empCardUpdateActionSaga called!!! ', action.payload);
  const { payload } = action;
  const response: AxiosResponse = yield call(getEmpCardModify, payload);
  console.log('data from empCardActionSaga:', response);
  yield put(empCardAction.EMP_CARD_UPDATE_STATUS(response.data.empCode));
}

// action과 api 요청을 보내주는 함수를 호출하는 saga를 연결해주는 saga
export function* onEmpCardSaga() {
  yield takeEvery(empCardAction.EMP_CARD_REQUESTED.type, empCardActionSaga);
  yield takeEvery(empCardAction.EMP_CARD_UPDATE_REQUESTED.type, empCardUpdateActionSaga);
}

export function* empCardSaga() {
  yield all([call(onEmpCardSaga)]);
}