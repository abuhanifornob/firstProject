export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName = 'Autum' | 'Summar' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemister = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
};

export type TacademicSemesterMapperCode = {
  [key: string]: string;
};
