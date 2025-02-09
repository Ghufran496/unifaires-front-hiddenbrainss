import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import config from "@/app/utils/config";
import axios from "axios";

interface IUser {
  id: number;
  fullname: string;
  email: string;
  mediaUrl: string;
  token: string;
}
const authHandler: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "password-login",
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        try {
          return await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
              ...credentials,
            })
            .then((res) => {
              if (res.status === 200 && res.data && res.data.status) {
                const user = res.data;
                return {
                  ...user.data,
                  email: user.email,
                };
              } else if (typeof res?.data?.message === "string") {
                throw new Error(res.data.message);
              }
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                throw "Invalid credentials";
              } else if (error.request) {
                throw "Check your network connection";
              } else if (typeof error?.message==="string") {
                throw error.message;
              } else {
                throw new Error(error);
              }
            });
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    CredentialsProvider({
      id: "business-login",
      name: "businessLogin",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/business-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );
          const user = await res.json();
          if (user.status == true) {
            return {
              ...user.data,
              email: user.email,
            };
          } else {
            throw new Error(user.message);
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    CredentialsProvider({
      id: "token-login",
      name: "tokenLogin",
      credentials: {
        password: {
          lable: "passowrd",
          type: "text",
        },
        token: {
          label: "accessCode",
          type: "text",
        },
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@email.com",
        },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${config.API.API_URL}/auth/associate-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                password: credentials?.password,
                token: credentials?.token,
                email: credentials?.email,
              }),
            }
          );
          const user = await res.json();
          if (user.status == true) {
            return {
              ...user.data,
              email: user.email,
            };
          } else {
            throw new Error(user.message);
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_KEY,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token = { ...token, user: session };
        return token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user.businessAccess = null;
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authHandler);

export { handler as GET, handler as POST };
