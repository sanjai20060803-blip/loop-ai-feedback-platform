"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  FileText,
  Sparkles,
  Users,
  LogOut,
  Settings,
} from "lucide-react";

import { navigation } from "@/constants/navigation";


interface SidebarProps {
  role: "ADMIN" | "ANALYST" | "VIEWER";
}


const icons: Record<string, any> = {
  dashboard: LayoutDashboard,
  feedback: MessageSquare,
  analytics: BarChart3,
  reports: FileText,
  "ask-loop": Sparkles,
  users: Users,
};


export default function Sidebar({
  role,
}: SidebarProps) {


  // IMPORTANT: This must be INSIDE the component
  const menuItems = navigation[role];


  return (

    <aside
      className="
      fixed
      left-0
      top-0
      h-screen
      w-64
      bg-white
      border-r
      shadow-sm
      flex
      flex-col
      z-50
      "
    >


      <div className="h-16 flex items-center px-6 border-b">

        <h1 className="text-2xl font-bold text-cyan-600">
          LOOP
        </h1>

      </div>



      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">


        {menuItems.map((item) => {

          const Icon =
            icons[item.name.toLowerCase()] || LayoutDashboard;


          return (

            <Link
              key={item.href}
              href={item.href}
              className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-lg
              text-slate-700
              hover:bg-cyan-50
              transition
              "
            >

              <Icon size={20}/>

              {item.name}

            </Link>

          );

        })}


      </nav>



      <div className="border-t p-4">


        <Link
          href="/dashboard/settings"
          className="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-lg
          hover:bg-slate-100
          "
        >

          <Settings size={20}/>

          Settings

        </Link>



        <button
          onClick={() =>
            signOut({
              callbackUrl:"/login"
            })
          }

          className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-lg
          text-red-600
          hover:bg-red-50
          "
        >

          <LogOut size={20}/>

          Logout

        </button>


      </div>


    </aside>

  );

}