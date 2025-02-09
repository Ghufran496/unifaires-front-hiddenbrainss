import { AppHeadInt } from "../AppHead/interfaceType";

export interface AdminDashboardLayoutProps extends AppHeadInt {
  children: React.ReactNode; // 👈️ type children
  showSideMenu?: boolean;
}
