const config = {
  URL: {
    WEB: process.env.NEXT_PUBLIC_WEB_URL,
    BLOG: "https://medium.com/@unifaires",
    TWITTER: "https://twitter.com/unifaires/",
    LINKEDIN: "https://www.linkedin.com/company/unifaires/",
    FACEBOOK: "https://web.facebook.com/unifaires/",
  },
  SEO: {
    image: "/logo.png",
    title: "Unifaires",
    description:
      "A broad selection of solutions, Educational and Career Resources all for you at your fingertips.",
  },
  API: {
    FRONT_END_URL: process.env.NEXT_PUBLIC_WEB_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_URL2: process.env.NEXT_PUBLIC_API_URL2,
    API_DOCUMENTATION: process.env.NEXT_PUBLIC_API_DOCUMENTATION,
    JWT_KEY: process.env.JWT_KEY,
    HOME_URL: process.env.HOME_URL,
    GUIDE_VIDEO_LINK: process.env.GUIDE_VIDEO_LINK,
  },
  ROLE_PERMISSIONS: {
    job: [
      "job_view",
      "job_create",
      "job_edit",
      "job_delete",
      "job_approve",
      "job_analytics",
    ],
    funding: [
      "funding_view",
      "funding_create",
      "funding_analytics",
      "funding_delete",
      "funding_edit",
      "funding_approve",
    ],
    content: [
      "content_edit",
      "content_analytics",
      "content_create",
      "content_view",
      "content_delete",
      "content_approve",
    ],
    help_support: ["help_support_assign_ticket"],
  },
  PERMISSIONS_URLS: {
    job_view: [
      "^/user/business-access/jobs$",
      "^/user/business-access/jobs/[a-z0-9-]+$",
    ],
    job_create: ["^/user/business-access/jobs/create$"],
    job_edit: ["^/user/business-access/jobs/create/[a-z0-9-]+$"],
    help_support_assign_ticket: ["^/user/business-access/help$"],
    content_view: [
      "^/user/business-access/course$",
      "^/user/business-access/course/view-course/[a-z0-9-]+$",
    ],
    content_analytics: ["^/user/business-access/course/[a-z0-9-]+$"],
    content_create: ["^/user/business-access/course/create$"],
    content_edit: ["^/user/business-access/course/withvideos/[a-z0-9-]+$"],
    funding_view: [
      "^/user/business-access/funding$",
      "^/user/business-access/funding/archived$",
      "^/user/business-access/funding/[a-z0-9-]+$",
    ],
    funding_create: ["^/user/business-access/funding/create$"],
    funding_edit: ["^/user/business-access/funding/create/[a-z0-9-]+$"],
  },
  USER_ROLE_ID: {
    manager: "manager",
    CONTRIBUTOR: "contributor",
  },
};
console.log(
  "\n Building app with api domain :\n ",
  process.env.NEXT_PUBLIC_API_URL
);

export default config;
