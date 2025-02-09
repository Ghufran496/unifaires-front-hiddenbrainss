import { getToken, JWT as AUTHJWTTYPE } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import config from "@/app/utils/config";
import { getCookie, setCookie } from "cookies-next";

const protectedPaths: string[] = [
  "/admin",
  "/user",
  "/business",
  "/user/manage-access",
];

const loginUserNotAccessPaths: string[] = [
  "/login",
  "/forgot-password",
  "/verify",
  "/verify-business"
];

type HasUserManageAccessType = {
  token: AUTHJWTTYPE;
  pathname: string;
};

async function fetchIPInformation(request: NextRequest) {
  let ip = request.headers?.get("x-forwarded-for");
  ip = ip === "::1" ? "8.8.8.8" : ip;

  // Get the previously fetched IP from the cookie
  const previousIPInfoStr = getCookie("ipInfo", { req: request });
  const previousIPInfo = previousIPInfoStr
    ? JSON.parse(previousIPInfoStr)
    : null;

  // Check if the IP has changed
  if (previousIPInfo && previousIPInfo.ip === ip) {
    // IP has not changed, return the previously fetched IP information
    return previousIPInfo;
  } else {
    // IP has changed, fetch new IP information
    try {
      const res = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,`
      );
      const data = await res.json();
      const newIPInfo = { ip, data };

      // // Update the cookie with the new IP information
      // request.cookies.set("ipInfo", JSON.stringify(newIPInfo));

      return newIPInfo;
    } catch (error) {
      console.error("Error fetching IP information:", error);
      return {
        ip: null,
        data: null,
        error: "Failed to fetch IP information",
      };
    }
  }
}
async function getUserRole(token: string, roleId: any) {
  try {
    const res = await fetch(`${config.API.API_URL}/roles/${roleId}`, {
      headers: {
        "x-token": token,
      },
    });

    const data = await res.json();
    return data.data.title;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

/**
 * Check whether logged in user has access to this page or not
 */
function hasUserManageAccess(inputObj: HasUserManageAccessType): boolean {
  const pathIndex = (
    typeof inputObj?.pathname === "string"
      ? inputObj.pathname.toLowerCase().trim()
      : ""
  ).indexOf("/user/business-access/");
  if (pathIndex === -1) {
    return true;
  }
  const permissionUrlObj: any = config.PERMISSIONS_URLS;
  let permissionArr: Array<string> = Array.isArray(
    inputObj?.token?.user?.businessAccess?.businessAccess
  )
    ? inputObj.token.user.businessAccess.businessAccess
    : [];
  permissionArr = permissionArr.flatMap((itemTxt: string) => {
    return typeof itemTxt === "string" &&
      Array.isArray(permissionUrlObj?.[itemTxt.toLowerCase().trim()])
      ? permissionUrlObj[itemTxt.toLowerCase().trim()]
      : [];
  });
  const pathNameIndex = permissionArr.findIndex((regExpTxt: string) => {
    const regExp1 = new RegExp(regExpTxt, "mi");
    return regExp1.test(inputObj.pathname.toLowerCase().trim());
  });
  if (pathNameIndex > -1) {
    return true;
  }

  return false;
}

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    if (protectedPaths.some((path) => pathname.startsWith(path))) {
      const token = await getToken({
        req: request,
        secret: process.env.JWT_KEY,
      });
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const userRole = await getUserRole(
        token?.user?.token,
        token?.user?.roleId
      );

      if (!userRole) {
        return NextResponse.redirect(new URL("/403", request.url));
      } else if (userRole === "user" && pathname.startsWith("/user")) {
        if (!hasUserManageAccess({ pathname, token })) {
          return NextResponse.redirect(new URL("/403", request.url));
        }
        return NextResponse.next();
      } else if (userRole === "business" && pathname.startsWith("/business")) {
        return NextResponse.next();
      } else if (userRole === "user" && pathname.startsWith("/business")) {
        return NextResponse.redirect(new URL("/user", request.url));
      } else if (userRole === "business" && pathname.startsWith("/user")) {
        return NextResponse.redirect(new URL("/business", request.url));
      } else {
        // Handle unknown roles or unauthorized access
        return NextResponse.redirect(new URL("/403", request.url));
      }
    }

    const ipInfo = await fetchIPInformation(request);

    // request.cookies.set("ipInfo", JSON.stringify(ipInfo));

    const res = NextResponse.next();
    const req = request;
    setCookie("ipInfo", JSON.stringify(ipInfo), { req, res });
    // if(!getCookie("language")){
    //   console.log("no language cookie founds")
    //   setCookie("language","english", {req, res})
    // }

    return res;
  } catch (error) {
    return NextResponse.error();
  }
}
