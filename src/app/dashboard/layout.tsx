import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import UserInfo from "@/components/layout/UserInfo";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const session = await getServerSession(authOptions);


  if (!session) {
    redirect("/login");
  }


  return (

    <div className="min-h-screen bg-gray-100">


      {/* Fixed Sidebar */}
      <Sidebar
        role={(session.user as any).role || "VIEWER"}
      />



      {/* Main Area */}

      <div className="ml-64 min-h-screen flex flex-col">


        {/* Header */}

        <header
          className="
          h-16
          bg-white
          border-b
          flex
          items-center
          justify-between
          px-8
          sticky
          top-0
          z-40
          "
        >

          <h1 className="text-xl font-bold text-slate-800">
            Dashboard
          </h1>


          <UserInfo />


        </header>



        {/* Content */}

        <main
          className="
          flex-1
          p-8
          overflow-y-auto
          "
        >

          {children}

        </main>


      </div>


    </div>

  );
}