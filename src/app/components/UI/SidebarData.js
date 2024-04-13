import React from "react"
import HomeIcon from '@mui/icons-material/Home';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';

export const SidebarData = [
   {
   title: "Home",
   icon: <HomeIcon/> ,
   link: "home"
   },
   {
      title: "Popular",
      icon: <OutboundOutlinedIcon/> ,
      link: "popular"
   },
   {
      title: "All",
      icon: <SignalCellularAltRoundedIcon/> ,
      link: "all"
   }
]
