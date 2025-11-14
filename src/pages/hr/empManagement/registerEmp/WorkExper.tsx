import { Grid, InputLabel, TextField, Button, Stack } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import React, { ChangeEventHandler, Dispatch, SetStateAction, useRef, useState } from 'react';
import { workExperTo } from 'pages/hr/base/types/types';
import { useDispatch } from 'react-redux';


interface Props{
  workExperSetter: Dispatch<SetStateAction<workExperTo>>;
}

const WorkExper: React.FC<Props> = ({ workExperSetter }) => {
  const dispatch = useDispatch();

  const [workExperBean, setWorkExperBean] = useState<workExperTo>({
    placeOfEmployment: '',
    employmentPeriod: '',
    workedPosition: '',
    jobDuties: '',
    workAddress: ''
  })

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // input 필드에 대한 작업을 수행합니다.
    const insertedWorkExperBean ={
      ...workExperBean,
      [e.target.name]: e.target.value
    }
    setWorkExperBean(insertedWorkExperBean);
    workExperSetter(insertedWorkExperBean);
  }

    const onSaveHandler = () => {
      
      if (workExperBean.placeOfEmployment === '') {
        alert('근무처를 입력해 주세요.');
        return;
      } else if (workExperBean.employmentPeriod === '') {
        alert('근무기간을 입력해주세요.');
        return;
      } else if (workExperBean.workedPosition === '') {
        alert('직위를 입력해주세요.');
        return;
      } else if (workExperBean.jobDuties === '') {
        alert('직무를 입력해주세요.');
        return;
      } else if (workExperBean.workAddress === '') {
        alert('소재지를 입력해주세요.');
        return;
      }

    }


    return(
        <Grid item sm={6} md={5.5}>
        <SubCard title="경력사항">
          <Grid container spacing={gridSpacing}>
            <Grid item md={6} xs={12}>
              <InputLabel>근무처</InputLabel>
              <TextField id="outlined-basic1" name='placeOfEmployment' onChange={handleInputChange} fullWidth style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>근무기간</InputLabel>
              <TextField id="outlined-basic1" name='employmentPeriod' onChange={handleInputChange} fullWidth style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>직위</InputLabel>
              <TextField id="outlined-basic1" name='workedPosition' onChange={handleInputChange} fullWidth style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>직무</InputLabel>
              <TextField id="outlined-basic1" name='jobDuties' onChange={handleInputChange} fullWidth style={{width: '200px'}} />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputLabel>소재지</InputLabel>
              <TextField id="outlined-basic1" name='workAddress' onChange={handleInputChange} fullWidth style={{width: '200px'}} />
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
export default WorkExper;