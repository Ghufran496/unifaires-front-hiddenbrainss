export interface HelpTrackInt {
  id: number;
  status: string;
}
export interface HelpInt {
  status: string;
  ticketId: any;
  email: any;
  category: string;
  severity: string;
  subject: string;
  id: number;
  helptracks: Array<HelpTrackInt>;
  updatedAt: string;
  createdAt: string;
}

export interface AssignAdminInt {
  firstname: any;
  lastname: any;
  email: any;
  fullname: string;
  id: number;
  role: object;
  imageUrl: string;
}
