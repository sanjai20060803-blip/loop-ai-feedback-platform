"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("VIEWER");

  const [error,setError] = useState("");

  async function handleSignup(
    e:React.FormEvent
  ){
    e.preventDefault();

    const res = await fetch("/api/auth/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password,
        role
      })
    });


    const data = await res.json();


    if(!res.ok){
      setError(data.message || "Signup failed");
      return;
    }


    router.push("/login");

  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >

        <h1 className="text-2xl font-bold">
          Create LOOP Account
        </h1>


        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}


        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />


        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
        />


        <select
          className="w-full border p-2 rounded"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >

          <option value="VIEWER">
            Viewer
          </option>

          <option value="ANALYST">
            Analyst
          </option>

        </select>


        <button
          className="w-full bg-black text-white p-2 rounded"
        >
          Signup
        </button>


        <p
          className="text-sm text-center cursor-pointer"
          onClick={()=>router.push("/login")}
        >
          Already have account? Login
        </p>


      </form>

    </div>

  );
}