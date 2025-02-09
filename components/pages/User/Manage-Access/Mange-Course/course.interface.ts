export interface CourseInt {
  status: any;
  averageRating: any;
  meta: string;
  id: number;
  title: string;
  slug: string;
  image: string;
  pricing: PricingInt;
  instructors: Array<InstructorsInt>;
  type: string;
  rating: number;
  creator: string;
  organizationName: string;
  students: number;
  progress?: number;
  description: string;
  ratingsCount: number;
  welcomeMessage: string;
  congratulationMessage: string;
  userId: number;
  sections: Array<SectionInt>;
  skills: Array<string>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SectionInt {
  id: number;
  title: string;
  objective: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  lectures: Array<LectureInt>;
  quizzes: Array<IQuiz>;
}
export interface LectureInt {
  lecturearticles: any;
  id: number;
  sectionId: number;
  title: string;
  lecturecontents: Array<ILectureContent>;
  lectureresources: Array<ILectureResources>;
  description: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface ILectureContent {
  id: number;
  title: string;
  mediaUri: string;
  lectureId: number;
  meta?: any;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
interface ILectureResources {
  id: number;
  title: string;
  mediaUri: string;
  lectureId: number;
  meta?: any;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface IQuiz {
  id: number;
  title: string;
  description: string;
  duration?: any;
  sectionId: number;
  quizquestions: Array<IQuizQuestion>;
  meta?: any;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface IQuizQuestion {
  id: number;
  title: string;
  question: string;
  type: string;
  options: Array<IOptions>;
}

interface IOptions {
  why: string;
  answer: string;
  correct: boolean;
}
interface PricingInt {
  id: number;
  courseId: number;
  discount: number;
  type: string;
  amount: number;
  currency: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
export interface InstructorsInt {
  id: number;
  name: string;
  image?: string;
  bio: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  courseId: number;
}

export interface ICourse {
  state: string;
  country: string;
  location: string;
  id: string;
  name: string;
  isUnifaires: boolean;
  company: string;
  publisher_display_name: string;
  image: string;
  title: string;
  courseUrl: string;
  mediaUrl: string;
  courseImgUrl: string;
  aboutOrganization: string;
  jobUrl: string;
  organizationName?: string;
  organizationLogo: string;
  position: string;
  welcomeMessage: string;
  enrolled: number;
  image_url: string;
  avgDuration: string;
  students: number;
  progress?: number;
  description: string;
  rating: number;
  createdAt?: Date;
  meta: string;
  updatedAt?: Date;
}
