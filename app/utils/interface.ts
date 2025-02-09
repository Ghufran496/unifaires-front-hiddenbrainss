export enum Gender {
  // eslint-disable-next-line no-unused-vars
  MALE = "Male",
  // eslint-disable-next-line no-unused-vars
  FEMALE = "Female",
}

export interface CourseInt {
  meta: string;
  id: string;
  title: string;
  slug: string;
  image: string;
  pricing?: PricingInt;
  instructors: Array<InstructorsInt>;
  type: string;
  aboutOrganization: string;
  rating: number;
  averageRating: any;
  coursesreviews: any;
  skills: any;
  target: string;
  requirement: string;
  scope: string;
  creator: string;
  reviews: any;
  organizationName: string;
  students: number;
  progress?: number;
  categoryId: any;
  level: string;
  lang: string;
  subtitleLanguage: string;
  sections: Array<any>;
  description: string;
  ratingsCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PricingInt {
  type?: string;
  amount?: number;
  currency?: string;
  discount: number;
}
interface InstructorsInt {
  name: string;
  bio: string;
  image: string;
}

export interface FundingInt {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  applicants?: number;
  avatar?: string;
  address: string;
  views?: number;
  author: UserInt;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FileInt {
  status: string;
  name: string;
  originFileObj: object;
}
export interface UploadInfoInt {
  file: FileInt;
  fileList: Array<object>;
}

export interface UserInt {
  id: number;
  roleId: number;
  status: boolean;
  fullname: string;
  firstname: string;
  lastname: string;
  username?: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  gender?: Gender;
  role?: string;
  createdAt: string;
  imageUrl?: string;
  companyName: string;
  updatedAt: string;
}

export type JobListDataType = {
  aboutOrganization: string;
  appDeadlineType: "Anytime" | "Fixed";
  businessId: string;
  city: string;
  contact: string;
  country: string;
  createdAt: string;
  deadline: string;
  deadlineEnd: string;
  details: string;
  employmentBenefits: string;
  experienceLevel: string;
  externalEmail: string;
  externalUrl: string;
  id: string;
  isUnifaires: boolean;
  jobcategory: { id: string; parentId: string };
  jobcategoryId: string;
  jobspaymenttypeId: string;
  language: Array<string>;
  levelOfEducation: string;
  mediaUrl: string;
  organizationName: string;
  referenceNo: string;
  salary: number;
  skills: any;
  slug: string;
  state: string;
  status:
    | "opened"
    | "archive"
    | "deactivate"
    | "interviewing"
    | "hired"
    | "closed"
    | "pending";
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
  workingStyle: string;
  zipcode: string;
};

export type PermissionDataType = {
  job_view: boolean;
  job_create: boolean;
  job_edit: boolean;
  job_delete: boolean;
  job_approve: boolean;
  job_analytics: boolean;
  funding_view: boolean;
  funding_create: boolean;
  funding_analytics: boolean;
  funding_delete: boolean;
  funding_edit: boolean;
  content_edit: boolean;
  content_analytics: boolean;
  content_create: boolean;
  content_view: boolean;
  content_delete: boolean;
  help_support_assign_ticket: boolean;
};
