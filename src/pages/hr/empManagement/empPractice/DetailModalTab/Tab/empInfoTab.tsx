import { Grid, InputLabel, Typography } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import { EmpInfoEntity } from '../../../types/empManagementTypes';

function EmpInfoTab({ selectedEmp }: { selectedEmp: EmpInfoEntity | null }) {
  console.log(selectedEmp?.birthDate);
  return (
    <Grid item sm={12} md={12}>
      <SubCard title="사원정보">
        <Grid container spacing={4}>
          <Grid item md={6} xs={12}>
            <InputLabel>사원명</InputLabel>
            <Typography variant="h6">{selectedEmp?.empName}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel>사원번호</InputLabel>
            <Typography variant="h6">{selectedEmp?.empCode}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel>부서</InputLabel>
            <Typography variant="h6">{selectedEmp?.deptCode}</Typography>
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>생일</InputLabel>
            <Typography variant="h6">{selectedEmp?.birthDate}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel>주민등록번호</InputLabel>
            <Typography variant="h6">{selectedEmp?.residentId}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel>성별</InputLabel>
            <Typography variant="h6">{selectedEmp?.gender}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel>휴대폰 번호</InputLabel>
            <Typography variant="h6">{selectedEmp?.mobileNumber}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel>주소</InputLabel>
            <Typography variant="h6">{selectedEmp?.address}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel>세부주소</InputLabel>
            <Typography variant="h6">{selectedEmp?.detailAddress}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel>우편번호</InputLabel>
            <Typography variant="h6">{selectedEmp?.postNumber}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel>이메일</InputLabel>
            <Typography variant="h6">{selectedEmp?.email}</Typography>
          </Grid>

          <Grid item xs={12}></Grid>
        </Grid>
      </SubCard>
    </Grid>
  );
}

export default EmpInfoTab;
