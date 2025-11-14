import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { REGISTER_EMP_REQUESTED, REGISTER_EMP_SUCCESS, REGISTER_EMP_FAILURE } from '../slices/registerEmpReducer';
import { registerEmp } from '../api/api';
import { EmpInfoEntity } from '../types/empManagementTypes';

// ⚠️ point: SagaGenerator 제거, 함수 시그니처는 Generator(혹은 any)로
function* registerEmpSaga(action: PayloadAction<EmpInfoEntity>): any {
  try {
    const result: any = yield call(registerEmp, action.payload);
    yield put(REGISTER_EMP_SUCCESS(result));
  } catch (error: any) {
    yield put(
      REGISTER_EMP_FAILURE({
        errorCode: error?.errorCode || 'UNKNOWN_ERROR',
        errorMsg: error?.message || '사원 등록 중 알 수 없는 오류가 발생했습니다.'
      })
    );
  }
}

export function* watchRegisterEmpSaga(): any {
  // RTK 액션은 .type을 쓰면 매칭 문제를 피할 수 있어요
  yield takeEvery(REGISTER_EMP_REQUESTED.type, registerEmpSaga);
}
