import { Grid, InputLabel, TextField, Button, Stack } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import React, { ChangeEventHandler, Dispatch, SetStateAction, useRef, useState } from 'react';
import { educationInfoTo } from 'pages/hr/base/types/types';
import { useDispatch } from 'react-redux';


interface Props {
  educationInfoSetter : Dispatch<SetStateAction<educationInfoTo>>;
}

const EducationInfo: React.FC<Props> = ({ educationInfoSetter }) => {
  const dispatch = useDispatch();

  const [ educationInfoBean, setEducationInfoBean] = useState<educationInfoTo>({
    schoolName: '',
    major: '',
    entranceDate: '',
    graduateDate: ''
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // input 필드에 대한 작업을 수행합니다.
    const insertedEducationInfoBean = {
      ...educationInfoBean,
      [e.target.name] : e.target.value
    }
    setEducationInfoBean(insertedEducationInfoBean);
    educationInfoSetter(insertedEducationInfoBean);
  }


    const onSaveHandler = () => {
      

      if (educationInfoBean.schoolName === '') {
        alert('학교명을 입력해 주세요.');
        return;
      } else if (educationInfoBean.major === '') {
        alert('전공을 입력해주세요.');
        return;
      } else if (educationInfoBean.entranceDate === '') {
        alert('입학일을 입력해주세요.');
        return;
      } else if (educationInfoBean.graduateDate === '') {
        alert('졸업일 입력해주세요.');
        return;
      }

      
    }


    return(
        <Grid item sm={6} md={8}>
        <SubCard title="학력정보">
          <Grid container spacing={gridSpacing}>
            <Grid item md={6} xs={12}>
              <InputLabel>학교명</InputLabel>
              <TextField id="outlined-basic1" name="schoolName" onChange={handleInputChange}  fullWidth style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>전공</InputLabel>
              <TextField id="outlined-basic1" name="major" onChange={handleInputChange}  fullWidth style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>입학일</InputLabel>
              <TextField id="outlined-basic14" name="entranceDate" onChange={handleInputChange} fullWidth type="date" style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>졸업일</InputLabel>
              <TextField id="outlined-basic14" name="graduateDate" onChange={handleInputChange} fullWidth type="date" style={{width: '200px'}} />
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
export default EducationInfo;