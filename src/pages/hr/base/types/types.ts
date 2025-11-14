// project import
import { String } from 'lodash';
import { NavItemType } from 'types';

// ==============================|| MENU TYPES ||============================== //

export interface ColumnProps {
  id: any;
  label: string;
}

export interface HolidayTO {
  applyDay?: string;
  holidayName?: string;
  holidayCode?: string;
  note?: string;
  status?: string;
}

export interface WorkTimeTO {
  applyYear: any;
  attendTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  quitTime: string;
  dinnerStartTime: string;
  dinnerEndTime: string;
  overEndTime: string;
  nightEndTime: string;
  status?: any;
  showTextFields?: boolean;
}

export interface DepTO {
  deptCode?: string | null;
  deptName?: string | null;
  deptTel?: string | null;
  status?: string | null;
  id?: string | null;
}

export interface PositionTO {
  positionCode?: string;
  position?: string;
  basesalary?: string;
  hobongratio?: string;
  error?: string;
  status?: string;
}

export interface HobongTO {
  hobongLevel?: string;
  baseSalary?: number;
  positionAllowance?: number;
  longevityBonus?: number;
  totalHobong?: number;
}

export interface empCardTO {
  hobongLevel?: string;
  baseSalary?: number;
  positionAllowance?: number;
  longevityBonus?: number;
  totalHobong?: number;
}

export interface empDetailTO {
  address?: string | undefined | null;
  position?: string| undefined | null;
  residentId?: string| undefined| null;
  hiredate?: string| undefined | null;
}

export interface empRegisterTO {
  empName?: string | undefined;
  birthDate?: string| undefined;
  mobileNumber?: string| undefined;
  address?: string| undefined;
  detailAddress?: string| undefined;
  employment?: string| undefined;
  email?: string| undefined;
  postNumber?: string| undefined;
  residentId?: string| undefined;
  deptCode?: string| undefined;
  deptName?: string| undefined;
  gender?: string| undefined;
  lastSchool?: string| undefined;
  position?: string| undefined;
  occupation?: string| undefined;
  hiredate?: string| undefined;
  hobong?: string| undefined;
  hobongCode?: string| undefined;

}

export interface educationInfoTo{
  schoolName?:  string | undefined;
  major?:  string | undefined;
  entranceDate?:  string | undefined;
  graduateDate?:  string | undefined;
}

export interface familyInfoTo{
  familyName?: string | undefined;
  relation?: string | undefined;
  familyDate?: string | undefined;
  liveTogether?: string | undefined;
}

export interface workExperTo{
  placeOfEmployment?: string | undefined;
  employmentPeriod?: string | undefined;
  workedPosition?: string | undefined;
  jobDuties?: string | undefined;
  workAddress?: string | undefined;
}

export interface certificationTo{
  certificationsName?: string | undefined;
  certificationsCode?: string | undefined;
  acquisitionDate?: string | undefined;
  expirationDate?: string | undefined;
}

export interface languageSkillsTo{
  testSubject?: string | undefined;
  testSubjectCode?: string | undefined;
  subject?: string | undefined;
  score?: string | undefined;
}

