import { Grid, InputLabel, TextField, Button, Stack, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import React, { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, dispatch } from 'store';
import { languageSkillsAction } from 'store/redux-saga/reducer/base/languageSkillsReducer';
import { languageSkillsTo } from 'pages/hr/base/types/types';


interface Props{
  languageSkillsSetter: Dispatch<SetStateAction<languageSkillsTo>>
}

const LanguageSkills: React.FC<Props> = ({ languageSkillsSetter }) => {
  const dispatch = useDispatch();

  const [languageSkillsBean, setLanguageSkillsBean] = useState<languageSkillsTo>({
    testSubject: '',
    testSubjectCode: '',
    subject: '',
    score: '',
  });

  const languageSkillsList = useSelector((state: RootState) => (state.languageSkills.languageSkillsList !== undefined ? state.languageSkills.languageSkillsList : []));

  useEffect(() => {
    console.log('dispatch호출됨');
    dispatch(languageSkillsAction.LANGUAGE_SKILLS_SEARCH_FETCH_REQUESTED(''));
  },[]);

  //화면에 보일 어학능력 리스트 생성
  const languageSkillsLists = languageSkillsList.map((item: any)=>{
    return(
      <MenuItem value={item.testSubject} key={item.testSubjectCode}>
      {item.testSubject}
      </MenuItem>
    );
  });
  



  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // input 필드에 대한 작업을 수행합니다.
    const insertedLanguageSkillsBean = {
      ...languageSkillsBean,
      [e.target.name]: e.target.value
    }
    setLanguageSkillsBean(insertedLanguageSkillsBean);
    languageSkillsSetter(insertedLanguageSkillsBean);
  }
  const handleSelectChange: (event: SelectChangeEvent<string>) => void = (e) => {
    // select 필드에 대한 작업을 수행합니다.
    const insertedLanguageSkillsBean = {
      ...languageSkillsBean,
      [e.target.name]: e.target.value
    }
    setLanguageSkillsBean(insertedLanguageSkillsBean);
    languageSkillsSetter(insertedLanguageSkillsBean);
  }

    const onSaveHandler = () => {

      if (languageSkillsBean.testSubject === '') {
        alert('시험과목명을 입력해 주세요.');
        return;
      } else if (languageSkillsBean.subject === '') {
        alert('외국어명을 입력해주세요.');
        return;
      } else if (languageSkillsBean.score === '') {
        alert('공인점수를 입력해주세요.');
        return;
      }

    }
    useEffect(() => {
      const languageSkills = languageSkillsList.filter((data : any) => data.testSubject === languageSkillsBean.testSubject);
      console.log("sssssssssssssssssssssss",languageSkills[0]);
      if (languageSkills.length > 0) {
        const subject = languageSkills[0].subject;
        const testSubjectCode = languageSkills[0].testSubjectCode
        // 여기서 subject 변수를 사용합니다.
        const insertedLanguageSkillsBean = {
          ...languageSkillsBean,
          'subject': subject,
          'testSubjectCode': testSubjectCode
        }
        setLanguageSkillsBean(insertedLanguageSkillsBean);
    } else {
        // 일치하는 언어 능력을 찾을 수 없는 경우 처리
    }
  
      
    }, [languageSkillsBean.testSubject]);
    console.log("ddddddddddddddddddddddddd",languageSkillsBean.subject);

    return(
        <Grid item sm={6} md={8}>
        <SubCard title="어학능력">
          <Grid container spacing={gridSpacing}>
            <Grid item md={6} xs={12}>
              <InputLabel>시험과목명</InputLabel>
              <FormControl fullWidth style={{width: '200px'}}>
                <Select
                  name='testSubject'
                  defaultValue="-1"
                  onChange={handleSelectChange}
                >
                  {languageSkillsLists}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>외국어명</InputLabel>
              <TextField id="outlined-basic1"  name='subject' value={languageSkillsBean.subject} onChange={handleInputChange} fullWidth style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>공인점수</InputLabel>
              <TextField id="outlined-basic1" name='score' onChange={handleInputChange} fullWidth style={{width: '200px'}} />
            </Grid>
            
            <Grid item xs={12}>
              <Stack direction="row">
                <AnimateButton>
                  <Button
                    sx={{ width: '100px' }}
                    onClick={() => {
                      onSaveHandler();
                    }}
                    variant="contained"
                  >
                    저장
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
);
}
export default LanguageSkills;