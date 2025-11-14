import { Grid, InputLabel, MenuItem, Select, TextField, FormControl, Button } from '@mui/material';
import Layout from 'layout';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import SubCard from 'ui-component/cards/SubCard';
import AddIcon from '@mui/icons-material/Add'; // ➕ 아이콘 추가
import DeleteIcon from '@mui/icons-material/Delete'; // ➖ 아이콘 추가
import { EducationInfoList, EmpInfoEntity } from '../../types/empManagementTypes';

interface EmpRegisterBeanProps {
  empRegisterBean: EmpInfoEntity;
  setEmpRegisterBean: Dispatch<SetStateAction<EmpInfoEntity>>;
}

const initialEdu: EducationInfoList = {
  lastSchool: '',
  schoolName: '',
  major: '',
  entranceDate: '',
  graduateDate: ''
};

function EducationRegister({ empRegisterBean, setEmpRegisterBean }: EmpRegisterBeanProps) {
  // 1) 로컬 상태: 학력 정보 리스트 전체를 관리
  const [educationList, setEducationList] = useState<EducationInfoList[]>(
    // 부모 상태에서 가져오거나, 없으면 최소 1개의 빈 항목으로 시작
    empRegisterBean.educationInfoList?.length ? empRegisterBean.educationInfoList : [initialEdu]
  );

  // 2) 입력/선택 변경 핸들러 (인덱스를 통해 특정 항목 수정)
  const handleChange = (index: number, name: keyof EducationInfoList, value: string) => {
    setEducationList((prevList) => prevList.map((edu, i) => (i === index ? { ...edu, [name]: value } : edu)));
  };

  // 3) 학력 정보 **추가** 핸들러
  const handleAddEducation = () => {
    setEducationList((prevList) => [...prevList, { ...initialEdu }]);
  };

  // 4) 학력 정보 **삭제** 핸들러
  const handleRemoveEducation = (index: number) => {
    setEducationList((prevList) => {
      // 항목이 하나만 남았을 경우, 삭제 대신 초기값으로 리셋
      if (prevList.length === 1) {
        return [{ ...initialEdu }];
      }
      // 해당 인덱스 항목 제거
      return prevList.filter((_, i) => i !== index);
    });
  };

  // 5) 로컬 educationList가 바뀔 때마다 부모 상태에 반영
  useEffect(() => {
    setEmpRegisterBean((prev) => {
      // 기존 배열과 참조가 같으면 업데이트하지 않음 (최적화)
      if (prev.educationInfoList === educationList) return prev;
      return { ...prev, educationInfoList: educationList };
    });
  }, [educationList, setEmpRegisterBean]);

  // 6) 부모 상태가 외부에서 변경될 때 로컬 eduList도 같이 초기화
  useEffect(() => {
    const incomingList = empRegisterBean.educationInfoList?.length ? empRegisterBean.educationInfoList : [initialEdu];

    // 참조가 다를 때만 업데이트
    if (educationList !== incomingList) {
      setEducationList(incomingList);
    }
  }, [empRegisterBean.educationInfoList]);

  return (
    <Grid item sm={12} md={12}>
      {/* 학력 정보 목록 렌더링 */}
      {educationList.map((edu, index) => (
        <SubCard
          key={index}
          title={`학력정보 #${index + 1}`}
          sx={{ marginBottom: 3 }} // 카드 사이에 간격 추가
          // 삭제 버튼을 SubCard의 액션 영역에 추가
          secondary={
            <Button variant="outlined" color="error" onClick={() => handleRemoveEducation(index)} startIcon={<DeleteIcon />}>
              삭제
            </Button>
          }
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <InputLabel>최종학력</InputLabel>
              <FormControl fullWidth>
                <Select
                  name="lastSchool"
                  value={edu.lastSchool ?? ''}
                  onChange={(e) => handleChange(index, 'lastSchool', e.target.value as string)}
                >
                  <MenuItem value={'대학 미졸업'}>대학 미졸업</MenuItem>
                  <MenuItem value={'전문대'}>전문대</MenuItem>
                  <MenuItem value={'학사'}>학사</MenuItem>
                  <MenuItem value={'석사'}>석사</MenuItem>
                  <MenuItem value={'박사'}>박사</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel>학교명</InputLabel>
              <TextField
                name="schoolName"
                value={edu.schoolName ?? ''}
                onChange={(e) => handleChange(index, 'schoolName', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel>전공</InputLabel>
              <TextField name="major" value={edu.major ?? ''} onChange={(e) => handleChange(index, 'major', e.target.value)} fullWidth />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel>입학일</InputLabel>
              <TextField
                name="entranceDate"
                type="date"
                value={edu.entranceDate ?? ''}
                onChange={(e) => handleChange(index, 'entranceDate', e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel>졸업일</InputLabel>
              <TextField
                name="graduateDate"
                type="date"
                value={edu.graduateDate ?? ''}
                onChange={(e) => handleChange(index, 'graduateDate', e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </SubCard>
      ))}

      {/* 학력 추가 버튼 */}
      <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleAddEducation} startIcon={<AddIcon />}>
          학력 정보 추가
        </Button>
      </Grid>
    </Grid>
  );
}

EducationRegister.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EducationRegister;
