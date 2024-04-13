import React from "react"
import AddIcon from '@mui/icons-material/Add';
import awwpfp from "@/app/assets/awwpfp.jpg";
import ProfileIcon from "./ProfileIcon.jsx";

export const CommunitiesData = [
   {
   title: "Create a community",
   icon: <AddIcon/> ,
   link: "create",
   isfavorite: false
   },
   {
      title: "aww",
      icon:<ProfileIcon url={awwpfp}/>,
      link: "aww",
      isfavorite: false
   },
   {
      title: "community test2",
      icon: <ProfileIcon url={awwpfp}/>,
      link: "",
      isfavorite: false
   }
]