import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Layout from 'layout';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { ReactElement } from 'react'; // ✅ react-markdown가 아니라 'react'에서 가져오세요
import SubCard from 'ui-component/cards/SubCard';
import { EmpInfoEntity } from '../../types/empManagementTypes';

interface EmpRegisterBeanProps {
  empRegisterBean: EmpInfoEntity;
  setEmpRegisterBean: Dispatch<SetStateAction<EmpInfoEntity>>;
}

const selectedData: { deptCode: string; deptName: string }[] = [
  { deptCode: 'DEP000', deptName: '회계팀' },
  { deptCode: 'DEP001', deptName: '인사팀' },
  { deptCode: 'DEP002', deptName: '전산팀' },
  { deptCode: 'DEP003', deptName: '보안팀' },
  { deptCode: 'DEP004', deptName: '개발팀' }
];

function RegisterPractice({ empRegisterBean, setEmpRegisterBean }: EmpRegisterBeanProps) {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setEmpRegisterBean((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target as { name: string; value: string };
    setEmpRegisterBean((prev) => ({ ...prev, [name]: value }));
  };

  const deptLists = () =>
    selectedData.map((data) => (
      <MenuItem key={data.deptCode} value={data.deptCode}>
        {data.deptName}
      </MenuItem>
    ));

  return (
    <Grid item sm={12} md={12}>
      <SubCard title="사원정보">
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <InputLabel>사원명</InputLabel>
            <TextField
              name="empName"
              value={empRegisterBean.empName ?? ''}
              onChange={handleInputChange}
              fullWidth
              style={{ width: '200px' }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>사원번호</InputLabel>
            <TextField
              name="empCode"
              value={empRegisterBean.empCode ?? ''}
              onChange={handleInputChange}
              fullWidth
              style={{ width: '200px' }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>부서</InputLabel>
            <FormControl fullWidth style={{ width: '200px' }}>
              <Select
                name="deptCode"
                value={empRegisterBean.deptCode ?? ''}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setEmpRegisterBean((prev) => ({ ...prev, [name]: value as string }));
                }}
              >
                {deptLists()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>생일</InputLabel>
            <TextField
              name="birthDate"
              type="date"
              value={empRegisterBean.birthDate ?? ''} // ✅ '' 또는 'YYYY-MM-DD'
              onChange={handleInputChange}
              fullWidth
              style={{ width: '200px' }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>주민등록번호</InputLabel>
            <TextField
              name="residentId"
              value={empRegisterBean.residentId ?? ''}
              placeholder="xxxxxx-xxxxxx"
              onChange={handleInputChange}
              fullWidth
              style={{ width: '200px' }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>성별</InputLabel>
            <FormControl fullWidth style={{ width: '200px' }}>
              <Select
                name="gender"
                value={empRegisterBean.gender ?? ''} // ✅ defaultValue 사용 금지
                onChange={handleSelectChange}
              >
                <MenuItem value="남자">남</MenuItem>
                <MenuItem value="여자">여</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>휴대폰 번호</InputLabel>
            <TextField
              name="mobileNumber"
              value={empRegisterBean.mobileNumber ?? ''}
              placeholder="010-1234-1234"
              onChange={handleInputChange}
              fullWidth
              style={{ width: '200px' }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>주소</InputLabel>
            <TextField
              name="address"
              value={empRegisterBean.address ?? ''}
              onChange={handleInputChange}
              fullWidth
              style={{ width: '200px' }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>세부주소</InputLabel>
            <TextField
              name="detailAddress"
              value={empRegisterBean.detailAddress ?? ''}
              onChange={handleInputChange}
              fullWidth
              style={{ width: '200px' }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>우편번호</InputLabel>
            <TextField
              name="postNumber"
              value={empRegisterBean.postNumber ?? ''}
              onChange={handleInputChange}
              fullWidth
              style={{ width: '200px' }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>이메일</InputLabel>
            <TextField
              name="email"
              value={empRegisterBean.email ?? ''}
              placeholder="aaa@aaa.com"
              onChange={handleInputChange}
              fullWidth
              style={{ width: '200px' }}
            />
          </Grid>
        </Grid>
      </SubCard>
    </Grid>
  );
}

RegisterPractice.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RegisterPractice;
