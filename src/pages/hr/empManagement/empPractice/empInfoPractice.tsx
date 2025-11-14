import { TableRow, TableCell, Checkbox } from '@mui/material';
import { EmpInfoEntity } from 'pages/hr/empManagement/types/empManagementTypes';

interface EmpInfoRowProps {
  emp: EmpInfoEntity;
  selectedEmpCode: string | null;
  setSelectedEmpCode: (code: string | null) => void;
}
// {emp, selectedEmpCode, setSelectedEmpCode}=props를 구조분해 할당하여 사용했기 때문에 props. 없음
export default function EmpInfoPractice({ emp, selectedEmpCode, setSelectedEmpCode }: EmpInfoRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={selectedEmpCode === emp.empCode}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedEmpCode(emp.empCode ?? null);
            } else {
              setSelectedEmpCode(null);
            }
          }}
        />
      </TableCell>
      <TableCell>{emp.empCode}</TableCell>
      <TableCell>{emp.empName}</TableCell>
      <TableCell>{emp.email}</TableCell>
      <TableCell>{emp.mobileNumber}</TableCell>
      <TableCell>{emp.gender}</TableCell>
      <TableCell>{emp.address}</TableCell>
    </TableRow>
  );
}
