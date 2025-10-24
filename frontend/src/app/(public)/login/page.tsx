"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Form } from "@/components/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/client";

type Fields = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [fields, setFields] = useState<Fields>({
    email: "",
    password: "",
  });

  const handleChange = (id: keyof Fields, value: string) => {
    setFields((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const inputFields = [
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
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = fields;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // ✅ cookies are automatically set by middleware + Supabase
    router.push("/dashboard");
  };

  return (
    <main className={styles.container}>
      <section className={styles.loginContainer}>
        <Form
          title="Login"
          onChange={handleChange}
          fields={inputFields}
          onSubmit={handleLogin} // 👈 make sure form triggers login
        />
        <p>
          Don&apos;t have an account? <Link href="/signup">Signup here.</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
