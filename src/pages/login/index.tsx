'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

type SignInResponse = {
  ok: boolean;
  error?: string;
  status?: number;
  url?: string;
};

const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (session?.user) {
      router.push("/");
      return;
    }

    setIsRedirecting(false);
  }, [session, status, router]);

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);
    setError(null);

    const result = (await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })) as SignInResponse | undefined;

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setLoading(false);
      reset();
      setError(result?.error || "Login failed");
    }
  };

  if (isRedirecting) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email below to login to your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-gray-700 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="test@example.com"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-dark-500 text-white rounded-lg hover:bg-blue-dark-600 disabled:bg-blue-300 mt-4"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
