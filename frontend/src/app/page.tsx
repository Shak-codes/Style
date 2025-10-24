import { redirect } from "next/navigation";
export default function Home() {
  // TODO: Check auth -> Send logged-in users to /dashboard,
  //       otherwise /landing
  redirect("/landing");
}
