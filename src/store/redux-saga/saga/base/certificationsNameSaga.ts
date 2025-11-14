import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { certificationsNameAction } from 'store/redux-saga/reducer/base/certificationsNameReducer';
import { getCertificationsName } from 'store/api/base/index';
//import { AxiosResponse } from 'axios';

// 자격증이름 정보 조회
function* searchCertificationsNameSaga() {
  console.log('searchCertificationsNameSagaaaaaaaaaaaaaaaaaa로옴');
  try {
    const { certificationsNameList } = yield call(getCertificationsName);
    console.log('api요청으로부터 받아온 직급 리스트: ', certificationsNameList);
    yield put(certificationsNameAction.CERTIFICATIONS_NAME_SEARCH_FETCH_STATUS(certificationsNameList));
  } catch (error) {
    console.log('에러발생:' + error);
  }
}

function* onCertificationsNameSaga() {
  console.log('일단 사가로 옴');
  yield takeLatest(certificationsNameAction.CERTIFICATIONS_NAME_SEARCH_FETCH_REQUESTED, searchCertificationsNameSaga);
}

export default function* positionSaga() {
  yield fork(onCertificationsNameSaga);
}