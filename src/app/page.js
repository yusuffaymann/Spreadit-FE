"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getCookies from "./utils/getCookies";
import Post from "./components/Post/Post"
import ReportModal from "./components/UI/ReportModal";
import handler from "./utils/apiHandler";
import DeletePost from "./components/Post/DeletePostModal";

function Home() {
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if(cookies === null || !cookies.access_token){
        router.push("/login")
      }else{
        router.push("/home")
      }
    }
    fetchData();
  }, []);

  return (
    <div>

      </div>
  );
}

export default Home;