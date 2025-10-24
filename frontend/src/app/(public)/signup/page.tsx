"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Form } from "@/components/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/client";

type Fields = {
  username: string;
  email: string;
  password: string;
  verify: string;
};

const Signup = () => {
  const router = useRouter();
  const [fields, setFields] = useState<Fields>({
    username: "",
    email: "",
    password: "",
    verify: "",
  });

  const handleChange = (id: keyof Fields, value: string) => {
    setFields((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const inputFields = [
    {
      id: "username" as const,
      label: "Username",
      value: fields.username,
    },
    {
      id: "email" as const,
      label: "Email",
      value: fields.email,
    },
    {
      id: "password" as const,
      label: "Password",
      value: fields.password,
    },
    {
      id: "verify" as const,
      label: "Verify Password",
      value: fields.verify,
    },
  ];

  const handleSignup = async () => {
    const { email, password, username } = fields;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className={styles.container}>
      <section className={styles.signupContainer}>
        <Form
          title="Create an Account!"
          onChange={handleChange}
          fields={inputFields}
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        />
        <p>
          Already have an account? <Link href="/login">Login here.</Link>
        </p>
      </section>
    </main>
  );
};

export default Signup;
