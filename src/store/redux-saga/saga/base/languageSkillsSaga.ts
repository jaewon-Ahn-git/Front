import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { languageSkillsAction } from 'store/redux-saga/reducer/base/languageSkillsReducer';
import { getLanguageSkills } from 'store/api/base/index';
//import { AxiosResponse } from 'axios';

// 자격증이름 정보 조회
function* searchLanguageSkillsSaga() {
  console.log('searchLanguageSkillsSagaaaaaaaaaaaaaaaaaa로옴');
  try {
    const { languageSkillsList } = yield call(getLanguageSkills);
    console.log('api요청으로부터 받아온 어학능력 리스트: ', languageSkillsList);
    yield put(languageSkillsAction.LANGUAGE_SKILLS_SEARCH_FETCH_STATUS(languageSkillsList));
  } catch (error) {
    console.log('에러발생:' + error);
  }
}

function* onLanguageSkillsSaga() {
  console.log('일단 사가로 옴');
  yield takeLatest(languageSkillsAction.LANGUAGE_SKILLS_SEARCH_FETCH_REQUESTED, searchLanguageSkillsSaga);
}

export default function* positionSaga() {
  yield fork(onLanguageSkillsSaga);
}