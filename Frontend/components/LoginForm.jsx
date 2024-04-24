"use client"
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImage from "../public/login.png";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="flex justify-center items-center h-screen">
        <div className=" shadow-lg p-8 rounded-lg md:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block md:col-span-1">
              <Image
                src={loginImage}
                alt="Login"
                className="w-full h-auto rounded-l-lg md:rounded-l-none md:rounded-tl-lg md:rounded-bl-lg"
              />
              <div className="text-black text-[32px] font-bold font-Poppins leading-[48px] text-center">OncoSight</div>
            </div>
            <div className="md:col-span-1">
              <h1 className="text-4xl text-black font-bold my-4 mx-8 text-center font-Poppins">Welcome back!</h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <h1 className="text-black text-lg font-medium font-Poppins">Email</h1>  
         
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder=" Enter Your Email "
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <div className="relative">
              <h1 className="text-black text-lg font-medium font-Poppins">Password</h1>  

                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400 mt-6" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 mt-6" />
                    )}
                  </button>
                </div>
                <button className="bg-rose-800  text-white font-bold cursor-pointer px-6 py-2 rounded-md">
                  Login
                </button>
                {error && (
                  <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                  </div>
                )}

                <div className="text-sm mt-3 text-right  font-Poppins">
                  Don't have an account?{" "}
                  <span className="underline text-fuchsia-600  font-Poppins">
                    <Link href="/register">Register</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

