export interface JobInt {
  id: number;
  title: string;
  organizationName: string;
  country: string;
  state: string;
  mediaUrl: string;
  aboutOrganization: string;
  details: string;
  name: string;
  publisher_display_name: string;
  image: string;
  contact: string;
  url: string;
  jobUrl: string;
  location: string;
  organizationLogo: string;
  position?: string;
  enrolled: number;
  image_url: string;
  avg_duration: string;
  students: number;
  progress?: number;
  description: string;
  createdAt: string;
  referenceNo: string;
}

export interface ContactPersonI {
  firstname: string;
  lastname: string;
  state: string;
  country: string;
  address1: string;
  email: string;
}
