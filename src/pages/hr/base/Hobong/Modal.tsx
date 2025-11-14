import React, { ChangeEvent, useEffect, useState } from 'react';
import { hobongAction } from 'store/redux-saga/reducer/base/hobongReducer';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dispatch } from 'store';

export const Modal = (props: { toggle: () => void; positionCode: string | undefined; applyDate: string; applyEndDate: string }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [baseSalaryPer, setBaseSalaryPer] = useState<number | null>(); // 초기치
  const [baseSalaryFixed, setBaseSalaryFixed] = useState<number | null>(); // 증가액
  const [posAllowancePer, setPosAllowancePer] = useState<number | null>(); // 초기치
  const [posAllowanceFixed, setPosAllowanceFixed] = useState<number | null>(); // 증가액
  const [longevityBonusPer, setLongevityBonusPer] = useState<number | null>(); // 초기치
  const [longevityBonusFixed, setLongevityBonusFixed] = useState<number | null>(); // 증가액

  const theme = useTheme();
  const modalClose = () => {
    props.toggle();
  };

  useEffect(() => {
    console.log('positionCode: ', props.positionCode);
  }, []);

  const handlePercentageApply = () => {
    props.toggle();
    const data = {
      positionCode: props.positionCode,
      baseSalaryPer: baseSalaryPer,
      posAllowancePer: posAllowancePer,
      longevityBonusPer: longevityBonusPer,
      applyDate: props.applyDate,
      applyEndDate: props.applyEndDate
    };
    dispatch(hobongAction.HOBONG_LIST_PERCENTAGE_UPDATE_FETCH_REQUESTED(data));
  };

  const handleFixedApply = () => {
    props.toggle();
    const data = {
      positionCode: props.positionCode,
      baseSalaryFixed: baseSalaryFixed,
      posAllowanceFixed: posAllowanceFixed,
      longevityBonusFixed: longevityBonusFixed,
      applyDate: props.applyDate,
      applyEndDate: props.applyEndDate
    };
    dispatch(hobongAction.HOBONG_LIST_FIXED_UPDATE_FETCH_REQUESTED(data));
  };

  const handlePercentageChange = (event: React.ChangeEvent<HTMLInputElement>, identifier: string) => {
    const value = event.target.value;
    if (value.trim() === '') {
      setBaseSalaryPer(null);
      setPosAllowancePer(null);
      setLongevityBonusPer(null);
      return;
    }
    if (isNaN(parseFloat(value))) {
      alert('올바른 숫자 형식을 입력해주세요.');
      event.target.value = '';
      return;
    } else {
      if (identifier === 'baseSalary') {
        setBaseSalaryPer(parseFloat(event.target.value));
      } else if (identifier === 'positionAllowance') {
        setPosAllowancePer(parseFloat(event.target.value));
      } else {
        setLongevityBonusPer(parseFloat(event.target.value));
      }
    }
  };

  const handleFixedChange = (event: React.ChangeEvent<HTMLInputElement>, identifier: string) => {
    const value = event.target.value;
    if (value.trim() === '') {
      setBaseSalaryFixed(null);
      setPosAllowanceFixed(null);
      setLongevityBonusFixed(null);
      return;
    }
    if (isNaN(parseFloat(value))) {
      alert('올바른 숫자 형식을 입력해주세요.');
      event.target.value = '';
      return;
    } else {
      if (identifier === 'baseSalary') {
        setBaseSalaryFixed(parseFloat(event.target.value));
      } else if (identifier === 'positionAllowance') {
        setPosAllowanceFixed(parseFloat(event.target.value));
      } else {
        setLongevityBonusFixed(parseFloat(event.target.value));
      }
    }
  };
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        sx={{ border: '5px solid black', marginBottom: '20px', margin: 'auto' }}
        scroll={'paper'}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        {open && (
          <>
            <Box>
              <DialogTitle id="form-dialog-title">호봉일괄인상</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table sx={{ width: 'auto' }} aria-label="simple table">
                        <TableHead>
                          <TableRow
                            sx={{
                              borderTop: '1px solid black',
                              borderBottom: '3px solid black',
                              marginBottom: '3px',
                              backgroundColor: '#E8D9FF'
                            }}
                          >
                            <TableCell>호봉</TableCell>
                            <TableCell>기본급</TableCell>
                            <TableCell>직책수당</TableCell>
                            <TableCell>근속수당</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>정률</TableCell>
                            <TableCell>
                              <TextField
                                value={baseSalaryPer}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handlePercentageChange(event, 'baseSalary')}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={posAllowancePer}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handlePercentageChange(event, 'positionAllowance')}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={longevityBonusPer}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handlePercentageChange(event, 'longevityBonus')}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>정액</TableCell>
                            <TableCell>
                              <TextField
                                value={baseSalaryFixed}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleFixedChange(event, 'baseSalary')}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={posAllowanceFixed}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleFixedChange(event, 'positionAllowance')}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={longevityBonusFixed}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleFixedChange(event, 'longevityBonus')}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ pr: 2.5, transform: 'translateX(-80px)' }}>
                <Button sx={{ color: theme.palette.error.dark }} onClick={() => modalClose()} color="secondary">
                  취소
                </Button>
                <Button variant="contained" size="small" onClick={() => handlePercentageApply()}>
                  정률적용
                </Button>
                <Button variant="contained" size="small" onClick={() => handleFixedApply()}>
                  정액적용
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>
    </div>
  );
};
