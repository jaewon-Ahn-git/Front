// third-party
import { createSlice } from '@reduxjs/toolkit';

type languageSkillsList = { languageSkillsList : any[]; };

let initialState: languageSkillsList = { languageSkillsList: [] };

const languageSkillsSlice = createSlice({
  name: 'languageSkills',
  initialState: initialState,
  reducers: {
    // 어학능력 조회
    LANGUAGE_SKILLS_SEARCH_FETCH_REQUESTED(state, action) {
      console.log("This is Reducer!! LANGUAGE_SKILLS_SEARCH_FETCH_REQUESTED called!!!");
    },

    // 어학능력리스트 업데이트
    LANGUAGE_SKILLS_SEARCH_FETCH_STATUS(state, action) {
      console.log("This is Reducer!! LANGUAGE_SKILLS_SEARCH_FETCH_STATUS called!!!", action.payload);
      state.languageSkillsList = action.payload;
      console.log("This is Reducer!! LANGUAGE_SKILLS_SEARCH_FETCH_STATUS called!!! state.positionList: ", state.languageSkillsList);
   
    }
  }
});

export const languageSkillsAction = languageSkillsSlice.actions;

export default languageSkillsSlice.reducer;