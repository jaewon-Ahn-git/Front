import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Detail from './detailPractice';
import { EmpInfoEntity } from '../../types/empManagementTypes';

type DetailModalProps = {
  selectedEmp: EmpInfoEntity;
  onClose: () => void;
};

export default function DetailModal({ selectedEmp, onClose }: DetailModalProps) {
  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      PaperProps={{
        sx: {
          width: '92vw', // 가로폭 키우기
          maxWidth: 1400, // 너무 커지지 않게 상한선
          height: '85vh', // 세로도 크게
          display: 'flex' // 아래 DialogContent가 커질 수 있도록
        }
      }}
    >
      <DialogTitle>사원 상세</DialogTitle>
      <DialogContent dividers sx={{ p: 2, flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Detail selectedEmp={selectedEmp} />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
