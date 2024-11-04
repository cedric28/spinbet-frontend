"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/authService";
import axios from "axios"

// Define Zod schema for form validation
const registerSchema = z
  .object({
    name: z.string().min(6,"Invalid Name"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);
    setError("");

    try {
      await registerUser(data.name, data.email, data.password);
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
     <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Register</h2>
        <p className="text-sm text-gray-600 mt-2">
          Enter your details below to create a new account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
       <div className="grid gap-2">
          <label htmlFor="name" className="text-gray-700 text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-gray-700 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="sample@example.com"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-gray-700 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="confirmPassword" className="text-gray-700 text-sm font-medium">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>
        {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-dark-500 text-white rounded-lg hover:bg-blue-dark-600 disabled:bg-blue-300 mt-4"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 underline">
          Login
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Register;