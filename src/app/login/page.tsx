"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );


    if (result?.error) {
      setError("Invalid email or password");
      return;
    }


    router.push("/dashboard");
    router.refresh();
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-5"
      >


        <h1 className="text-2xl font-bold text-center">
          LOOP Login
        </h1>



        {/* Demo Account */}

        <div
          className="
          bg-cyan-50
          border
          border-cyan-200
          rounded-lg
          p-4
          text-sm
          "
        >

          <h2 className="font-semibold text-cyan-700 mb-2">
            Demo Account
          </h2>


          <p>
            <span className="font-medium">
              Email:
            </span>{" "}
            admin@loop.com
          </p>


          <p>
            <span className="font-medium">
              Password:
            </span>{" "}
            123456
          </p>


        </div>




        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}



        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />



        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />



        <button
          className="
          w-full
          bg-black
          text-white
          p-2
          rounded
          hover:bg-gray-800
          transition
          "
        >
          Login
        </button>

         <p
className="text-sm text-center cursor-pointer"
onClick={()=>router.push("/signup")}
>
Create new account
</p>
      </form>


    </div>
  );
}