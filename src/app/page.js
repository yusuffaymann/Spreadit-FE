"use client"

import Image from "next/image";
import Layout from "./settings/SettingsLayout";
import Toogle from "./components/UI/Switch";
import PostFooter from "./components/post/PostFooter";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <PostFooter />
    </div>
  );
}
