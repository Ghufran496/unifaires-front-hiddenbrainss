import { AppHeadInt } from "../AppHead/interfaceType";

export interface PublicLayoutProps extends AppHeadInt {
  children: React.ReactNode; // 👈️ type children
}
