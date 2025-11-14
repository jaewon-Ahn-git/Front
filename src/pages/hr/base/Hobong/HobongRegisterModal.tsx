import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
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


const Modal = (props: { toggle: () => void; setHandleApply: Dispatch<SetStateAction<boolean>>; positionCode: string|undefined; applyDate: string; applyEndDate: string; }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [baseSalaryInit, setBaseSalaryInit] = useState<number|string>(''); // 초기치
  const [baseSalaryIncr, setBaseSalaryIncr] = useState<number|string>(''); // 증가액
  const [posAllowanceInit, setPosAllowanceInit] = useState<number|string>(''); // 초기치
  const [posAllowanceIncr, setPosAllowanceIncr] = useState<number|string>(''); // 증가액
  const [longevityBonusInit, setLongevityBonusInit] = useState<number|string>(''); // 초기치
  const [longevityBonusIncr, setLongevityBonusIncr] = useState<number|string>(''); // 증가액  
  
  const theme = useTheme();
  const modalClose = () => {
    props.setHandleApply(false);
    props.toggle();
  };

  useEffect(() => {
    console.log('positionCode: ', props.positionCode);
  }, []);

  const handleApply = () => {
    props.setHandleApply(true);
    props.toggle();
    const data = {
      positionCode: props.positionCode,
      baseSalaryInit: baseSalaryInit,
      baseSalaryIncr: baseSalaryIncr,
      posAllowanceInit: posAllowanceInit,
      posAllowanceIncr: posAllowanceIncr,
      longevityBonusInit: longevityBonusInit,
      longevityBonusIncr: longevityBonusIncr,
      applyDate: props.applyDate,
      applyEndDate: props.applyEndDate
    };
    dispatch(hobongAction.HOBONG_LIST_INSERT_FETCH_REQUESTED(data));
    
  };

  const handleInitialValueChange = (event: React.ChangeEvent<HTMLInputElement>, identifier: string) => {
    const value = event.target.value;
    if (isNaN(parseFloat(value))) {
      alert('올바른 숫자 형식을 입력해주세요.');
    } else {
      if(identifier === 'baseSalary'){
        setBaseSalaryInit(parseFloat(event.target.value));
      }else if(identifier === 'positionAllowance'){
        setPosAllowanceInit(parseFloat(event.target.value));
      }else{
        setLongevityBonusInit(parseFloat(event.target.value));
      }
      
    }
  };

  const handleIncrementChange = (event: React.ChangeEvent<HTMLInputElement>, identifier: string) => {
    const value = event.target.value;
    if (isNaN(parseFloat(value))) {
      alert('올바른 숫자 형식을 입력해주세요.');
    } else {
      if(identifier === 'baseSalary'){
        setBaseSalaryIncr(parseFloat(event.target.value));
      }else if(identifier === 'positionAllowance'){
        setPosAllowanceIncr(parseFloat(event.target.value));
      }else{
        setLongevityBonusIncr(parseFloat(event.target.value));
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
              <DialogTitle id="form-dialog-title">호봉일괄등록</DialogTitle>
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
                            <TableCell>초기치</TableCell>
                            <TableCell>증가액</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>기본급</TableCell>
                            <TableCell>
                              <TextField value={baseSalaryInit} onChange={(event: ChangeEvent<HTMLInputElement>) => handleInitialValueChange(event, 'baseSalary')} />
                            </TableCell>
                            <TableCell>
                              <TextField value={baseSalaryIncr} onChange={(event: ChangeEvent<HTMLInputElement>) => handleIncrementChange(event, 'baseSalary')} />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>직책수당</TableCell>
                            <TableCell>
                              <TextField value={posAllowanceInit} onChange={(event: ChangeEvent<HTMLInputElement>) => handleInitialValueChange(event, 'positionAllowance')} />
                            </TableCell>
                            <TableCell>
                              <TextField value={posAllowanceIncr} onChange={(event: ChangeEvent<HTMLInputElement>) => handleIncrementChange(event, 'positionAllowance')} />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>근속수당</TableCell>
                            <TableCell>
                              <TextField value={longevityBonusInit} onChange={(event: ChangeEvent<HTMLInputElement>) => handleInitialValueChange(event, 'longevityBonus')} />
                            </TableCell>
                            <TableCell>
                              <TextField value={longevityBonusIncr} onChange={(event: ChangeEvent<HTMLInputElement>) => handleIncrementChange(event, 'longevityBonus')} />
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
                <Button variant="contained" size="small" onClick={() => handleApply()}>
                  적용
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default React.memo(Modal);
