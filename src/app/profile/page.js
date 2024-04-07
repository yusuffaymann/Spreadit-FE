"use client";

import React from "react";
import Post from "../components/post/Post";
import Sidebar from "../components/UI/Sidebar";
import ToolBar from "../components/UI/Toolbar";
import MyProfileInfo from "./MyProfileInfo";
import ProfileInfo from "./ProfileInfo";
import ProfileBar from "./ProfileBar";
import Image from "next/image";

import profilepicture from "@/app/assets/PP1.png";
import addPhotoIcon from "@/app/assets/add-photo.svg";
import styles from "./Profile.module.css";

function Profile() {
  const [selected, setSelected] = React.useState(0);
  const images = [
    "https://media.gettyimages.com/id/1132402360/photo/cat-sleeping-on-her-back.jpg?s=612x612&w=gi&k=20&c=EgyglqP76bDYcs_QAHQ-4ZLI0_Bldwtajfnw7UpE89M=",
    "https://media.istockphoto.com/id/94056427/photo/adorable-silver-tabby-kitten-sleeping-stretched-out.jpg?s=1024x1024&w=is&k=20&c=E_AZrLVF6sT8sEN43vs-lE5xuAJabayHTQ8O2RH9VTs=",
    "https://media1.popsugar-assets.com/files/thumbor/fKpl-doFLDJWfxYCz5X1mAr5jRI=/0x0:2003x2003/2011x2011/filters:format_auto():quality(85):extract_cover()/2019/09/23/864/n/1922243/74b4f2275d89208a0f2ad4.00493766_.jpg",
  ];
  function convertToEmbedLink(videoLink) {
    // Regular expression to check if the link is a YouTube link
    const youtubeRegex =
      /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

    if (youtubeRegex.test(videoLink)) {
      // If it's a YouTube link, replace "watch" with "embed"
      return videoLink.replace("/watch?v=", "/embed/");
    } else {
      // If it's not a YouTube link, return the original link
      return videoLink;
    }
  }

  return (
    <div className={styles.profile_container}>
      <ToolBar page={"Profile"} loggedin={true} />

      <div className={styles.main_container}>

        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        <div className={styles.profile}>
          <div className={styles.profile_header}>
            <div className={styles.profile_banner}>
              <div className={styles.profile_picture}>
                <Image
                  src={profilepicture}
                  width={64}
                  height={64}
                  style={{
                    overflow: "hidden",
                    borderRadius: "624.9375rem",
                    borderStyle: "solid",
                    borderColor: "#0000001a",
                  }}
                  alt="profile picture"
                />
                <div className={styles.circle}>
            <Image src={addPhotoIcon} width={16} height={16} alt="Post Options" />
          </div>
              </div>

              <div className={styles.profile_name}>
                <h1 className={styles.username_header}>Username</h1>
                <p className={styles.username}>u/Username</p>
              </div>
            </div>

            <ProfileBar selected={selected} setSelected={setSelected} />

            <div className={styles.posts}>
              <Post
                title={"Post example with multiple images"}
                subRedditName={"r/aww"}
                subRedditPicture={
                  "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd"
                }
                images={images}
                time={"2 days ago"}
                upVotes={"11k"}
                comments={"976"}
                banner={
                  "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png"
                }
                subRedditDescription={
                  "Things that make you go AWW! -- like puppies, bunnies, babies, and so on... Feel free to post original pictures and videos of cute things."
                }
              />
              <Post
                title={"Post example with multiple images"}
                subRedditName={"r/aww"}
                subRedditPicture={
                  "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd"
                }
                images={images}
                time={"2 days ago"}
                upVotes={"11k"}
                comments={"976"}
                banner={
                  "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png"
                }
                subRedditDescription={
                  "Things that make you go AWW! -- like puppies, bunnies, babies, and so on... Feel free to post original pictures and videos of cute things."
                }
              />
              <Post
                title={"Post example with multiple images"}
                subRedditName={"r/aww"}
                subRedditPicture={
                  "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd"
                }
                images={images}
                time={"2 days ago"}
                upVotes={"11k"}
                comments={"976"}
                banner={
                  "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png"
                }
                subRedditDescription={
                  "Things that make you go AWW! -- like puppies, bunnies, babies, and so on... Feel free to post original pictures and videos of cute things."
                }
              />
              <Post
                title={"post example with a description only"}
                subRedditName={"r/aww"}
                subRedditPicture={
                  "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd"
                }
                description={"the description"}
                time={"1 day ago"}
                upVotes={"0"}
                comments={"35"}
                banner={
                  "https://styles.redditmedia.com/t5_2qs0q/styles/bannerBackgroundImage_7glcgg5ymxp21.png"
                }
              />
            </div>
          </div>

          <div className={styles.profile_info_container}>
            <div className={styles.profile_info}>
              <MyProfileInfo />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
