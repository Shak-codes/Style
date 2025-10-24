import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/server";
import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";
import styles from "./styles.module.scss";

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
    <>
      <Navbar
        data={[
          { label: "Dashboard", route: "/dashboard" },
          { label: "Appointments", route: "/appointments" },
          { label: "Clients", route: "/clients" },
          { label: "Services", route: "/services" },
          { label: "Calendar", route: "/calendar" },
          { label: "Settings", route: "/settings" },
        ]}
      />
      <main className={styles.mainContainer}>{children}</main>
    </>
  );
};

export default AuthLayout;
