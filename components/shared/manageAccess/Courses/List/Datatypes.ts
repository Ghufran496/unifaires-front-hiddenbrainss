export type CourseItemStatusType =
  | "active"
  | "archive"
  | "deactivate"
  | "pending";
export type CourseItemCategoryType = {
  id: string;
  parentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  hierarchyLevel: number;
  ancestors: [
    {
      id: string;
      parentId: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      hierarchyLevel: number;
      categoryancestor: {
        categoryId: string;
        ancestorId: string;
      };
    }
  ];
};

export type CourseItemSkillType = {
  id: string;
  parentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  hierarchyLevel: number;
  coursesskills: {
    id: string;
    courseId: string;
    skillId: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type CourseItemInstructorType = {
  id: string;
  name: string;
  image: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
};

export type CourseItemPricingType = {
  id: string;
  courseId: string;
  type: "free" | "paid";
  currency: string;
  amount: string;
  discount: string;
  createdAt: string;
  updatedAt: string;
};

export type CourseItemReviewType = {
  id: string;
  userId: string;
  businessId: string;
  courseId: string;
  review: string;
  rating: string;
  createdAt: string;
  updatedAt: string;
};

export type CourseItemSectionsType = {
  id: string;
  title: string;
  objective: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  quizzes: any;
  lectures: any;
};

export type CourseListItemType = {
  id: string;
  title: string;
  meta: string;
  slug: string;
  description: string;
  image: string;
  video: string;
  organizationName: string;
  aboutOrganization: string;
  scope: string;
  requirement: string;
  target: string;
  lang: string;
  level: string;
  welcomeMessage: string;
  congratulationMessage: string;
  status: CourseItemStatusType;
  userId: string;
  businessId: string;
  categoryId: string;
  subtitleLanguage: string;
  programStartDate: string;
  applicationFees: string;
  isAssociateFree: boolean;
  programType: string;
  studyPace: string;
  studyMode: string;
  programRanking: string;
  applicationDeadline: string;
  levelsOfEducation: string;
  qualificationType: string;
  externalUrl: string;
  isExternal: string;
  scholarshipUrl: string;
  isScholarship: boolean;
  createdAt: string;
  updatedAt: string;
  category: CourseItemCategoryType;
  skills: Array<CourseItemSkillType>;
  instructors: Array<CourseItemInstructorType>;
  pricing: CourseItemPricingType;
  coursesreviews: Array<CourseItemReviewType>;
  sections: Array<CourseItemSectionsType>;
  students: number;
  ratingsCount: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  };
  averageRating: string;
};

export type CourseTabType = { label: any; key: string; onClick: () => any };
export type PageMenuKeyType = "publishedCourses" | "archive" | "pending";

export type CouseListCompType = {
  fetchDatas: (inputObj: {
    page: number;
    status: CourseItemStatusType;
    searchTxt: string;
  }) => any;
  dataList: Array<CourseListItemType>;
  pageLoading: boolean;
  permissions: {
    content_edit: boolean;
    content_analytics: boolean;
    content_create: boolean;
    content_view: boolean;
    content_delete: boolean;
    content_approve: boolean;
  };
  pagination: {
    total: number;
    pageSize: number;
    currentPage: number;
    setCurrentPage: any;
  };
  searchTerms: string;
  menuTitle: string;
  setSearchTerms: (txt1: string) => any;
  menu: {
    items: Array<CourseTabType>;
    activeKey: PageMenuKeyType;
    setActiveMenu: (menuTxt: PageMenuKeyType) => any;
  };
  handleCreateUrl: () => any;
  handleViewUrl: (courseId: string) => any;
  handleDeleteCourse: (courseId: string) => any;
  handleEditCourse: (courseId: string) => any;
  handleArchiveCourse: (courseId: string) => any;
  handleUnArchieveCourse: (courseId: string) => any;
  handleApproveCourse: (courseId: string) => any;
};
