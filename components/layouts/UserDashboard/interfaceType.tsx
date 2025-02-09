import { AppHeadInt } from "../AppHead/interfaceType";

export interface UserDashboardLayoutProps extends AppHeadInt {
  children: React.ReactNode; // 👈️ type children
  // session: any
}
