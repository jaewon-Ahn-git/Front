import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getEmplist, insertRestAttd } from 'store/redux-saga/api/attendance';
import { AxiosResponse } from 'axios';
import { restAttdActions } from 'store/slices/hr/attendancePractice/restattdPracticeReducer';

// 사원 조회
function* fetchEmpList() {
  try {
    const response: AxiosResponse = yield call(getEmplist);
    console.log('사원 조회 response', response);
    yield put(restAttdActions.getEmpListSuccess(response.data.list));
  } catch (error: any) {
    const payload = {
      errorCode: error?.response?.data?.errorCode || 'NETWORK_ERROR',
      errorMsg: error?.response?.data?.errorMsg || error.message || '알 수 없는 오류가 발생했습니다.'
    };
    yield put(restAttdActions.getEmpListFailure(payload));
  }
}

// 근태외 등록
function* registRestAttd(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(insertRestAttd, payload);
    yield put(restAttdActions.registRestAttdSuccess(response));
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchAttdActions() {
  yield takeLatest(restAttdActions.getEmpListRequest, fetchEmpList);
  yield takeLatest(restAttdActions.registRestAttdRequest, registRestAttd);
}

export default function* attdSaga() {
  yield all([fork(watchAttdActions)]);
}
