import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/server";
import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";
import styles from "./styles.module.scss";
import { Dashboard, Calendar, User, Hair, Settings } from "@/icons";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Authenticated area",
};

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className={styles.container}>
      <Navbar
        data={[
          { label: "Dashboard", route: "/dashboard", Icon: Dashboard },
          { label: "Appointments", route: "/appointments", Icon: Calendar },
          { label: "Clients", route: "/clients", Icon: User },
          { label: "Services", route: "/services", Icon: Hair },
          { label: "Calendar", route: "/calendar", Icon: Calendar },
          { label: "Settings", route: "/settings", Icon: Settings },
        ]}
      />
      <main className={styles.mainContainer}>{children}</main>
    </div>
  );
};

export default AuthLayout;
