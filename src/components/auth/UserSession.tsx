"use client";

import { useSession } from "next-auth/react";


export default function UserSession(){

 const {data:session}=useSession();


 if(!session?.user){
   return null;
 }


 return (
   <div>
     <p>
       {session.user.name}
     </p>

     <p>
       Role: {session.user.role}
     </p>
   </div>
 );

}