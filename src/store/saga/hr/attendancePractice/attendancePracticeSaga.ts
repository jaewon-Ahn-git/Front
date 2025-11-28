import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AttendancePracticeTo } from 'types/attendance/types';
import { attdPracticeActions } from '../../../slices/hr/attendancePractice/attendancePracticeReducer';
import { registInoutApi } from 'store/api/attendancePractice';

const { REGIST_INOUT_REQUEST, REGIST_INOUT_SUCCESS, REGIST_INOUT_FAILURE } = attdPracticeActions;

// ⚠️ point: SagaGenerator 제거, 함수 시그니처는 Generator(혹은 any)로
function* attendancePracticeSaga(action: PayloadAction<AttendancePracticeTo>): any {
  try {
    const result: any = yield call(registInoutApi, action.payload);
    yield put(REGIST_INOUT_SUCCESS(result));
  } catch (error: any) {
    yield put(
      REGIST_INOUT_FAILURE({
        errorCode: error?.errorCode || 'UNKNOWN_ERROR',
        errorMsg: error?.message || '사원 등록 중 알 수 없는 오류가 발생했습니다.'
      })
    );
  }
}

export default function* attdPracticeSaga(): any {
  // RTK 액션은 .type을 쓰면 매칭 문제를 피할 수 있어요
  yield takeEvery(REGIST_INOUT_REQUEST.type, attendancePracticeSaga);
}
