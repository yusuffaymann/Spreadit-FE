import React, { useState } from "react";
import "./TopCommunities.css";
import ToolBar from "../components/UI/Toolbar";
import CommunityBoxItem from "../components/UI/CommunityBoxItem";
import awwpfp from "@/app/assets/awwpfp.jpg";
import Image from "next/image";

function TopCommunities() {
  const communities = [
    {
      icon: <Image className="icon" src={awwpfp} alt="Community Profile" />,
      name: "technology",
      members: "10.2M",
      category: "All things technology.",
      description: "ttttttttttttttttttttttttttttttttt",
    },
    {
      icon: <Image className="icon" src={awwpfp} alt="Community Profile" />,
      name: "science",
      members: "12.3M",
      category: "Discussion and news about science.",
      description: "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
    },
    {
      icon: <Image className="icon" src={awwpfp} alt="Community Profile" />,
      name: "space",
      members: "9.8M",
      category: "Dedicated to space enthusiasts.",
      description: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    },
    {
      icon: <Image className="icon" src={awwpfp} alt="Community Profile" />,
      name: "technology",
      members: "10.2M",
      category: "All things technology.",
      description: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    },
    {
      icon: <Image className="icon" src={awwpfp} alt="Community Profile" />,
      name: "science",
      members: "12.3M",
      category: "Discussion and news about science.",
      description: "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
    },
    {
      icon: <Image className="icon" src={awwpfp} alt="Community Profile" />,
      name: "space",
      members: "9.8M",
      category: "Dedicated to space enthusiasts.",
      description: "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
    },
  ];

  return (
    <div className="topcommunities">
      <ToolBar loggedin={true} />
      <div className="text-container">
        <p className="main-title">Best of Spreadit</p>
        <p className="secound-title">Top Communities</p>
        <p className="title-desc">Browse Spreadit's largest communities</p>{" "}
        <div className="comunity-container">
          <ul className="unorderd-list">
            {communities.map((val, key) => {
              return (
                <div>
                  <CommunityBoxItem
                    count={key + 1}
                    name={val.name}
                    icon={val.icon}
                    iconurl={awwpfp}
                    description={val.description}
                    category={val.category}
                    members={val.members}
                    key={key}
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopCommunities;
