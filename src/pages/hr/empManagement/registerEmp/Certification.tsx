import { Grid, InputLabel, TextField, Button, Stack, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import React, { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { RootState, dispatch, useSelector } from 'store';
import { certificationsNameAction } from 'store/redux-saga/reducer/base/certificationsNameReducer';
import { certificationTo } from 'pages/hr/base/types/types';
import { useDispatch } from 'react-redux';


interface Props{
  certificationSetter: Dispatch<SetStateAction<certificationTo>>;
}

const Certification: React.FC<Props> = ({ certificationSetter }) => {
  const dispatch = useDispatch();

  const [certificationBean, setCertificationBean] = useState<certificationTo>({
    certificationsName: '',
    certificationsCode: '',
    acquisitionDate: '',
    expirationDate: ''
  });

  const certificationsNameList = useSelector((state: RootState) => (state.certificationsName.certificationsNameList !== undefined ? state.certificationsName.certificationsNameList : []));

  useEffect(()=>{
    console.log('dispatch호출됨');
    dispatch(certificationsNameAction.CERTIFICATIONS_NAME_SEARCH_FETCH_REQUESTED(''));
  },[]);


  //화면에 보일 자격증 이름 리스트 생성
  const certificationsNameLists = certificationsNameList.map((item: any)=>{
    return(
      <MenuItem value={item.certificationsName} key={item.certificationsCode}>
      {item.certificationsName}
      </MenuItem>
    );
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const insertedCertificationBean = {
      ...certificationBean,
      [e.target.name]: e.target.value
    }
    setCertificationBean(insertedCertificationBean);
    certificationSetter(insertedCertificationBean);
  };

  const handleSelectChange: (event: SelectChangeEvent<string>) => void = (e) => {
    // select 필드에 대한 작업을 수행합니다.
    const insertedCertificationBean = {
      ...certificationBean,
      [e.target.name]: e.target.value
    }
    setCertificationBean(insertedCertificationBean);
    certificationSetter(insertedCertificationBean);
  }


    const onSaveHandler = () => {

      if (certificationBean.certificationsName === '') {
        alert('자격증 이름을 입력해 주세요.');
        return;
      } else if (certificationBean.acquisitionDate === '') {
        alert('취득일을 입력해주세요.');
        return;
      } else if (certificationBean.expirationDate === '') {
        alert('만료일을 입력해주세요.');
        return;
      }


    }

    useEffect(() => {
      const certification = certificationsNameList.filter((data : any) => data.certificationsName === certificationBean.certificationsName);
      console.log("aaaaaaaaaaaa",certification[0]);
      if (certification.length > 0) {
        const certificationsCode = certification[0].certificationsCode;
        // 여기서 subject 변수를 사용합니다.
        const insertedCertificationBean = {
          ...certificationBean,
          'certificationsCode': certificationsCode
        }
        setCertificationBean(insertedCertificationBean);
    } else {
        // 일치하는 언어 능력을 찾을 수 없는 경우 처리
    }
  
      
    }, [certificationBean.certificationsName]);


    return(
        <Grid item sm={6} md={8}>
        <SubCard title="자격증">
          <Grid container spacing={gridSpacing}>
            <Grid item md={6} xs={12}>
              <InputLabel>자격증 이름</InputLabel>
              <FormControl fullWidth style={{width: '200px'}}>
                <Select
                  name='certificationsName'
                  defaultValue="-1"
                  onChange={handleSelectChange}
                >
                  {certificationsNameLists}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>취득일</InputLabel>
              <TextField id="outlined-basic14" name='acquisitionDate' onChange={handleInputChange} fullWidth type="date" style={{width: '200px'}} />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>만료일</InputLabel>
              <TextField id="outlined-basic14" name='expirationDate' onChange={handleInputChange} fullWidth type="date" style={{width: '200px'}} />
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
export default Certification;