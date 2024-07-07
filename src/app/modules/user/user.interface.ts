export type TUsers = {
  id: string;
  password: string;
  neendsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'active' | 'blocked';
  isDeleted: boolean;
};
