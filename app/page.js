"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";


export default function Home() {

  const user =useUser();
  const createUser = useMutation(api.user.createUser)

  const CheckUser = async () => {
    if (!user.user?.primaryEmailAddress?.emailAddress) {
      console.error("User email is missing");
      return;
    }
  
    const result = await createUser({
      email: user.user.primaryEmailAddress.emailAddress, 
      imageUrl: user.user.imageUrl || "",
      userName: user.user.fullName || "Unknown User",
    });
  
    console.log(result);
  };
  
  useEffect(() => {
    if (user.isLoaded && user.user) {
      CheckUser();
    }
  }, [user]);
  return (
   <div>
    <h2>hi</h2>
    <Button>click</Button>
    <UserButton></UserButton>
   </div>
   
  );
}

