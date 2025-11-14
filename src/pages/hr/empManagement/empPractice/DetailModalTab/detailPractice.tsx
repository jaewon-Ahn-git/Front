import * as React from 'react';
import { Grid, Tabs, Tab } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';

import { EmpInfoEntity } from '../../types/empManagementTypes';
import EmpInfoTab from './Tab/empInfoTab';
import EducationInfoTab from './Tab/educationInfoTab';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

// 접근성 props (스크린리더 연결)
function tabIndex(index: number) {
  return {
    id: `detail-tab-${index}`,
    'aria-controls': `detail-tabpanel-${index}`
  };
}

function Detail({ selectedEmp }: { selectedEmp: EmpInfoEntity | null }) {
  // 디자인용: 탭 이동만 지원 (상태는 모달 내부에서만 유지)
  const [value, setValue] = React.useState(0);

  return (
    <Grid container spacing={3} sx={{ mt: 1, width: 1, maxWidth: 1700 }}>
      <Grid item xs={12}>
        <MainCard>
          <Tabs
            value={value}
            onChange={(_, v) => setValue(v)}
            variant="scrollable"
            aria-label="사원 등록 탭"
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 'bold',
                minHeight: 'auto',
                minWidth: 10,
                px: 1,
                py: 1.5,
                mr: 2.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
              mb: 3
            }}
          >
            <Tab label="사원정보" {...tabIndex(0)} />
            <Tab label="학력정보" {...tabIndex(1)} />
            <Tab label="가족관계" {...tabIndex(2)} />
            <Tab label="경력사항" {...tabIndex(3)} />
            <Tab label="자격증" {...tabIndex(4)} />
            <Tab label="어학능력" {...tabIndex(5)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <EmpInfoTab selectedEmp={selectedEmp} />
          </TabPanel>

          <TabPanel value={value} index={1} />
          <EducationInfoTab selectedEmp={selectedEmp} />
          <TabPanel value={value} index={2} />

          <TabPanel value={value} index={3} />

          <TabPanel value={value} index={4} />

          <TabPanel value={value} index={5} />
        </MainCard>
      </Grid>
    </Grid>
  );
}

export default Detail;
