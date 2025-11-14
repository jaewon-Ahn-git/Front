import { Grid, InputLabel, Typography, Box, Divider } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import { EmpInfoEntity } from '../../../types/empManagementTypes';

function EducationInfoTab({ selectedEmp }: { selectedEmp: EmpInfoEntity | null }) {
  const educations = selectedEmp?.educationInfoList ?? [];

  return (
    <Grid item sm={12} md={12}>
      <SubCard title="학력 정보">
        {educations.length === 0 ? (
          <Typography color="text.secondary">학력 정보가 없습니다.</Typography>
        ) : (
          <Grid container spacing={3}>
            {educations.map((edu: any, idx: number) => (
              <Grid item xs={12} key={edu.eduSeq ?? idx}>
                {/* 한 단위(최종학력/학교명/전공/입학일/졸업일)를 묶어서 렌더링 */}
                <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(0,0,0,0.12)' }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    학력 #{idx + 1}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                      <InputLabel>최종학력</InputLabel>
                      <Typography variant="h6">{edu.lastSchool ?? '-'}</Typography>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <InputLabel>학교명</InputLabel>
                      <Typography variant="h6">{edu.schoolName ?? '-'}</Typography>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <InputLabel>전공</InputLabel>
                      <Typography variant="h6">{edu.major ?? '-'}</Typography>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <InputLabel>입학일</InputLabel>
                      <Typography variant="h6">{edu.entranceDate ?? '-'}</Typography>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <InputLabel>졸업일</InputLabel>
                      <Typography variant="h6">{edu.graduateDate ?? '-'}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </SubCard>
    </Grid>
  );
}

export default EducationInfoTab;
