import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  id: string | number;
  fullname: string;
  firstname: string;
  lastname: string;
  othername: string;
  isAssociate: boolean;
  associatedAcounts: any;
  email: string;
  balance: number;
  gender: string;
  dateOfBirth: string;
  apiKey: string;
  token: string;
  whoIs: number | boolean;
  isEmailVerify: boolean;
  status: boolean;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  roleId: number | string;
  isPassword: boolean;
  isUser: boolean;
  isBusiness: boolean;
  isSubscribe: boolean;
  user: any;
  business: any;
  companyName: string;
  companySize: any;
  businessType: string;
  phone: any;
  enrolCourse: any;
  businessAccess: any;
  virtualAccount: any;
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string | number;
      fullname: string;
      firstname: string;
      lastname: string;
      othername: string;
      isAssociate: boolean;
      associatedAcounts: any;
      email: string;
      balance: number;
      gender: string;
      dateOfBirth: string;
      apiKey: string;
      token: string;
      whoIs: number | boolean;
      isEmailVerify: boolean;
      status: boolean;
      imageUrl?: string | null;
      createdAt: string;
      updatedAt: string;
      roleId: number | string;
      isPassword: boolean;
      isUser: boolean;
      isBusiness: boolean;
      isSubscribe: boolean;
      user: any;
      business: any;
      companyName: string;
      companySize: any;
      businessType: string;
      phone: any;
      enrolCourse: any;
      businessAccess: any;
      virtualAccount: any;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;

    user: {
      id: string | number;
      fullname: string;
      firstname: string;
      lastname: string;
      othername: string;
      isAssociate: boolean;
      associatedAcounts: any;
      email: string;
      balance: number;
      gender: string;
      dateOfBirth: string;
      apiKey: string;
      token: string;
      whoIs: number | boolean;
      isEmailVerify: boolean;
      status: boolean;
      imageUrl?: string | null;
      createdAt: string;
      updatedAt: string;
      roleId: number | string;
      isPassword: boolean;
      isUser: boolean;
      isBusiness: boolean;
      isSubscribe: boolean;
      user: any;
      business: any;
      companyName: string;
      companySize: any;
      businessType: string;
      phone: any;
      enrolCourse: any;
      businessAccess: any;
      virtualAccount: any;
    };
  }
}

declare module "next-auth" {
  interface User {
    id: string | number;
    fullname: string;
    firstname: string;
    lastname: string;
    othername: string;
    isAssociate: boolean;
    associatedAcounts: any;
    email: string;
    balance: number;
    gender: string;
    dateOfBirth: string;
    apiKey: string;
    token: string;
    whoIs: number | boolean;
    isEmailVerify: boolean;
    status: boolean;
    imageUrl?: string | null;
    createdAt: string;
    updatedAt: string;
    roleId: number | string;
    isPassword: boolean;
    isUser: boolean;
    isBusiness: boolean;
    isSubscribe: boolean;
    user: any;
    business: any;
    companyName: string;
    companySize: any;
    businessType: string;
    phone: any;
    enrolCourse: any;
    businessAccess: any;
    virtualAccount: any;
  }
}
