import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AttendancePracticeTo } from 'types/attendance/types';
import { attdPracticeActions } from '../../../slices/hr/attendancePractice/attendancePracticeReducer';
import { registInoutApi } from 'store/api/attendancePractice';

const { REGIST_INOUT_REQUEST, REGIST_INOUT_SUCCESS, REGIST_INOUT_FAILURE } = attdPracticeActions;

// 출입기록 등록 Saga
function* attendancePracticeSaga(action: PayloadAction<AttendancePracticeTo>): any {
  try {
    // API 호출
    const result: any = yield call(registInoutApi, action.payload);
    // result는 백엔드에서 내려주는 값 그대로 (예: { errorCode: 0, errorMsg: 'succeed', ... })

    // ✅ 여기서 서버 응답 기준으로 성공/실패 분기
    if (result.errorCode === 0) {
      // 성공일 때만 SUCCESS 디스패치
      yield put(REGIST_INOUT_SUCCESS(result));
    } else {
      // errorCode가 0이 아니면 실패 처리
      yield put(REGIST_INOUT_FAILURE(result));
    }
  } catch (error: any) {
    // 네트워크 오류, 서버 죽음 등 예외 상황
    yield put(
      REGIST_INOUT_FAILURE({
        errorCode: -1,
        errorMsg: error?.message || '출입등록 중 알 수 없는 오류가 발생했습니다.'
      })
    );
  }
}

export default function* attdPracticeSaga(): any {
  // REGIST_INOUT_REQUEST 액션이 들어올 때마다 위 saga 실행
  yield takeEvery(REGIST_INOUT_REQUEST.type, attendancePracticeSaga);
}
