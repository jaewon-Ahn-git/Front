import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getEmpList, insertBreakAttd, insertOvertimeAttd, insertRestAttd } from '../../../api/attendancePractice';
import { AxiosResponse } from 'axios';
import { restAttdActions } from 'store/slices/hr/attendancePractice/restattdPracticeReducer';

// 공통 에러 payload 생성 함수 (선택사항이지만 보기 편해서 추가)
function buildErrorPayload(error: any, defaultMessage: string) {
  return {
    errorCode: error?.response?.data?.errorCode || 'NETWORK_ERROR',
    errorMsg: error?.response?.data?.errorMsg || error?.message || defaultMessage
  };
}

// 사원 조회
function* fetchEmpList() {
  try {
    const response: AxiosResponse = yield call(getEmpList);
    const data = response.data;

    console.log('사원 조회 response', data);

    if (data.errorCode === 0) {
      // ✅ 정상 응답
      yield put(restAttdActions.getEmpListSuccess(data.list));
    } else {
      // ❌ 서버에서 에러코드 내려준 경우
      yield put(
        restAttdActions.getEmpListFailure({
          errorCode: data.errorCode,
          errorMsg: data.errorMsg || '사원 조회에 실패했습니다.'
        })
      );
    }
  } catch (error: any) {
    // ❌ HTTP 4xx/5xx, 네트워크 오류 등
    const payload = buildErrorPayload(error, '사원 조회 중 알 수 없는 오류가 발생했습니다.');
    yield put(restAttdActions.getEmpListFailure(payload));
  }
}

// 근태외 등록
function* registRestAttd(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(insertRestAttd, payload);
    const data = response.data;

    if (data.errorCode === 0) {
      // 성공 시, 예전처럼 list만 넘김 (리듀서에 영향 최소화)
      yield put(restAttdActions.registRestAttdSuccess(data.list));
    } else {
      yield put(
        restAttdActions.registRestAttdFailure({
          errorCode: data.errorCode,
          errorMsg: data.errorMsg || '근태외 등록에 실패했습니다.'
        })
      );
    }
  } catch (error: any) {
    const payload = buildErrorPayload(error, '근태외 등록 중 알 수 없는 오류가 발생했습니다.');
    yield put(restAttdActions.registRestAttdFailure(payload));
  }
}

// 휴게 근태외 등록
function* registBreakAttd(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(insertBreakAttd, payload);
    const data = response.data;

    if (data.errorCode === 0) {
      yield put(restAttdActions.registBreakAttdSuccess(data.list));
    } else {
      yield put(
        restAttdActions.registBreakAttdFailure({
          errorCode: data.errorCode,
          errorMsg: data.errorMsg || '휴게 근태외 등록에 실패했습니다.'
        })
      );
    }
  } catch (error: any) {
    const payload = buildErrorPayload(error, '휴게 근태외 등록 중 알 수 없는 오류가 발생했습니다.');
    yield put(restAttdActions.registBreakAttdFailure(payload));
  }
}

// 연장근무 등록
function* registOvertimeAttd(action: any) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(insertOvertimeAttd, payload);
    const data = response.data;

    if (data.errorCode === 0) {
      yield put(restAttdActions.registOvertimeAttdSuccess(data.list));
    } else {
      yield put(
        restAttdActions.registOvertimeAttdFailure({
          errorCode: data.errorCode,
          errorMsg: data.errorMsg || '연장근무 등록에 실패했습니다.'
        })
      );
    }
  } catch (error: any) {
    const payload = buildErrorPayload(error, '연장근무 등록 중 알 수 없는 오류가 발생했습니다.');
    yield put(restAttdActions.registOvertimeAttdFailure(payload));
  }
}

export function* watchRestAttdActions() {
  yield takeLatest(restAttdActions.getEmpListRequest, fetchEmpList);
  yield takeLatest(restAttdActions.registRestAttdRequest, registRestAttd);
  yield takeLatest(restAttdActions.registBreakAttdRequest, registBreakAttd);
  yield takeLatest(restAttdActions.registOvertimeAttdRequest, registOvertimeAttd);
}

export default function* restattdSaga() {
  yield all([fork(watchRestAttdActions)]);
}
