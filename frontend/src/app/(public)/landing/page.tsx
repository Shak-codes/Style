"use client";
import { StaticButton } from "@/components/client";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/signup");
  };

  return (
    <section>
      <h1>Style</h1>
      <p>Your craft, measured better.</p>
      <section>
        <StaticButton text="Get Started!" onClick={handleClick} />
      </section>
    </section>
  );
};

export default Landing;
