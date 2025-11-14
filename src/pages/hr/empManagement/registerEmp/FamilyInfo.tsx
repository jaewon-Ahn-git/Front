import { Grid, InputLabel, TextField, Button, Stack, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import React, { ChangeEventHandler, Dispatch, SetStateAction, useRef, useState } from 'react';
import { familyInfoTo } from 'pages/hr/base/types/types';
import { useDispatch } from 'react-redux';


interface Props {
  familyInfoSetter: Dispatch<SetStateAction<familyInfoTo>>;
}

const FamilyInfo: React.FC<Props> = ({ familyInfoSetter }) => {
  const dispatch = useDispatch();

  const [familyInfoBean, setFamilyInfoBean] = useState<familyInfoTo>({
    familyName: '',
    relation: '',
    familyDate: '',
    liveTogether:''
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // input 필드에 대한 작업을 수행합니다.
    const insertedFamilyInfoBean = {
      ...familyInfoBean,
      [e.target.name]: e.target.value
    }
    setFamilyInfoBean(insertedFamilyInfoBean);
    familyInfoSetter(insertedFamilyInfoBean);
  }

  const handleSelectChange: (event: SelectChangeEvent<string>) => void = (e) => {
    // select 필드에 대한 작업을 수행합니다.
    const insertedFamilyInfoBean = {
      ...familyInfoBean,
      [e.target.name]: e.target.value
    }
    setFamilyInfoBean(insertedFamilyInfoBean);
    familyInfoSetter(insertedFamilyInfoBean);
  }

    
  
  const onSaveHandler = () => {
    

      if (familyInfoBean.familyName === '') {
        alert('가족이름을 입력해 주세요.');
        return;
      } else if (familyInfoBean.relation === '') {
        alert('관계를 입력해주세요.');
        return;
      } else if (familyInfoBean.familyDate === '') {
        alert('가족생일을 입력해주세요.');
        return;
      } else if (familyInfoBean.liveTogether === '') {
        alert('동거여부를 선택해 주세요.');
        return;
      }

    }

    return(
        <Grid item sm={6} md={8}>
        <SubCard title="가족관계">
          <Grid container spacing={gridSpacing}>
            <Grid item md={6} xs={12}>
              <InputLabel>가족이름</InputLabel>
              <TextField id="outlined-basic1" name='familyName' onChange={handleInputChange} fullWidth style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>관계</InputLabel>
              <TextField id="outlined-basic1" name='relation' onChange={handleInputChange}  fullWidth style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>가족생일</InputLabel>
              <TextField id="outlined-basic14" name='familyDate' onChange={handleInputChange} fullWidth type="date" style={{width: '200px'}} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>동거여부</InputLabel>
              <FormControl fullWidth style={{width: '200px'}}>
                <Select name='liveTogether' defaultValue="-1" onChange={handleSelectChange}>
                  <MenuItem value={'동거'}>동거</MenuItem>
                  <MenuItem value={'비동거'}>비동거</MenuItem>
                </Select>
              </FormControl>
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
export default FamilyInfo;