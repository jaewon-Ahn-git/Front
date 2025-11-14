//registerEmp types
export interface EmpInfoEntity {
  empCode?: string | undefined | null;
  empName?: string | undefined | null;
  email?: string | undefined | null;
  gender?: string | undefined | null;
  address?: string | undefined | null;
  birthDate?: string | undefined | null;
  mobileNumber?: string | undefined | null;
  detailAddress?: string | undefined | null;
  postNumber?: string | undefined | null;
  residentId?: string | undefined;
  deptCode?: string | undefined;
  educationInfoList?: EducationInfoList[];
}
export interface EducationInfoList {
  lastSchool?: string | undefined | null;
  schoolName?: string | undefined | null;
  major?: string | undefined | null;
  entranceDate?: string | undefined | null;
  graduateDate?: string | undefined | null;
}
//  EmpModifyModal types
export interface ModifyEmpInfoEntity {
  empCode: string | undefined | null;
  empName: string | undefined | null;
  email: string | undefined | null;
  gender: string | undefined | null;
  address: string | undefined | null;
  birthDate: string | undefined | null;
  mobileNumber: string | undefined | null;
  detailAddress: string | undefined | null;
  postNumber: string | undefined | null;
  lastSchool: string | undefined | null;
  residentId?: string | undefined;
  //학력사항
  highSchoolName: string | undefined | null;
  major: string | undefined | null;
  entranceDate: string | undefined | null;
  graduateDate: string | undefined | null;
  //가족관계
  familyName: string | undefined | null;
  relation: string | undefined | null;
  familyBirthdate: string | undefined | null;
  liveTogether: string | undefined | null;
  //경력사항
  placeOfEmployment: string | undefined | null;
  employmentPeriod: string | undefined | null;
  employmentPosition: string | undefined | null;
  jobDuties: string | undefined | null;
  workAddress: string | undefined | null;
  //어학능력
  testSubject: string | undefined | null;
  subject: string | undefined | null;
  score: string | undefined | null;
  //자격증
  certificationsName: string | undefined | null;
  acquisitionDate: string | undefined | null;
  expirationDate: string | undefined | null;
  //work_info 테이블
  occupation: string | undefined | null;
  hiredate: string | undefined | null;
  employmentType: string | undefined | null;
}
//========================================================
//empInfo types

/*
export interface EmpInfoEntity {
  empCode: string;
  empName: string | undefined | null;
  email: string | undefined | null;
  image: string | undefined | null;
  deptName: string;
  hobong: string;
  positionCode: string;
  gender: string | undefined | null;
  address: string | undefined | null;
  birthDate: string | undefined | null;
  mobileNumber: string | undefined | null;
  deptCode: string;
  detailAddress: string | undefined | null;
  postNumber: string | undefined | null;
  lastSchool: string | undefined | null;
  //학력사항
  highSchoolName: string | undefined | null;
  major: string | undefined | null;
  entranceDate: string | undefined | null;
  graduateDate: string | undefined | null;
  //가족관계
  familyName: string | undefined | null;
  relation: string | undefined | null;
  familyBirthdate: string | undefined | null;
  liveTogether: string | undefined | null;
  //경력사항
  placeOfEmployment: string | undefined | null;
  employmentPeriod: string | undefined | null;
  employmentPosition: string | undefined | null;
  jobDuties: string | undefined | null;
  workAddress: string | undefined | null;
  //어학능력
  testSubject: string | undefined | null;
  subject: string | undefined | null;
  score: string | undefined | null;
  //자격증
  certificationsName: string | undefined | null;
  acquisitionDate: string | undefined | null;
  expirationDate: string | undefined | null;
  //work_info 테이블
  occupation: string | undefined | null;
  hiredate: string | undefined | null;
  employmentType: string | undefined | null;
}
*/

//==========================================================
//empEvaluation
export type EvalEmpInfo = {
  empName: string;
  empCode: string;
  ability: string;
  achievement: string;
  approvalStatus: string;
  attitude: string;
  deptName: string;
  durationOfTraining: string;
  grade: string;
  position: string;
  numberOfCertificate: string;
  applyDay: string;
};

export type EvalEmpInfoEntity = {
  empCode: string;
  empName: string;
  lastSchool: string;
  numberOfCertificate: string;
  applyDay: string;
  durationOfTraining: string;
  deptName: string;
  position: string;
  achievement: string;
  ability: string;
  apporvalStatus: string;
  grade: string;
  attitude: string;
};
//======================================================
//empEvalManagement
export interface EmpEvalManagementInfoEntity {
  empCode: string;
  empName: string;
  applyDay: string;
  deptName: string;
  position: string;
  approvalStatus: string;
  grade: string;
}

//=================================================================
//empEvaluationResult

export interface EmpEvalResultInfoEntity {
  empCode: string;
  empName: string;
  applyDay: string;
  deptName: string;
  position: string;
  approvalStatus: string;
  grade: string;
}
//==================================================================
//registerEmpAppointment
export interface EmpAppointmentInfoEntity {
  empCode: string;
  empName: string;
  email: string;
  deptName: string;
  positionCode: string;
  gender: string;
  address: string;
  birthdate: string;
  mobileNumber: string;
  deptCode: string;
  detailAddress: string;
  postNumber: string;
  lastSchool: string;
}

//=================================================================
//EmpAppointmentModal
export type dataType = {
  empCode: string;
  hosu: string;
  afterChange: string | number;
  startDate: string | undefined;
  endDate: string | undefined;
  type: string;
};

export type AppointmentEmpInfo = {
  empCode: string;
  empName: string;
  deptCode: string;
  positionCode: string;
};

//==================================================================
//empAppointmentManagement
export interface EmpAppointmentManagementInfoEntity {
  hosu: string;
  empCode: string;
  requestDate: string;
  beforeChange: string;
  afterChange: string;
  approvalStatus: string;
}
//================================================================
//empAppointmentResult

export interface EmpAppointmentResultInfoEntity {
  hosu: string;
  empCode: string;
  requestDate: string;
  beforeChange: string;
  afterChange: string;
  approvalStatus: string;
}

//==================================================================
// saga types
export type typeAction = { payload: any; type: string };
