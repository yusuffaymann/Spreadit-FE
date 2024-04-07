"use client"

import { useState, useEffect } from "react";
import Post from "./components/Post/Post"
import ReportModal from "./components/UI/ReportModal";
import handler from "./utils/apiHandler";
import DeletePost from "./components/Post/DeletePostModal";

export default function Home() {
/*   const images=["https://media.gettyimages.com/id/1132402360/photo/cat-sleeping-on-her-back.jpg?s=612x612&w=gi&k=20&c=EgyglqP76bDYcs_QAHQ-4ZLI0_Bldwtajfnw7UpE89M=","https://media.istockphoto.com/id/94056427/photo/adorable-silver-tabby-kitten-sleeping-stretched-out.jpg?s=1024x1024&w=is&k=20&c=E_AZrLVF6sT8sEN43vs-lE5xuAJabayHTQ8O2RH9VTs=","https://media1.popsugar-assets.com/files/thumbor/fKpl-doFLDJWfxYCz5X1mAr5jRI=/0x0:2003x2003/2011x2011/filters:format_auto():quality(85):extract_cover()/2019/09/23/864/n/1922243/74b4f2275d89208a0f2ad4.00493766_.jpg"] */

const [postId, setPostId] = useState(0);
const [upVotes,setUpVotes] = useState(0);
const [downVotes,setDownVotes] = useState(0);
const [commentsCount,setCommentsCount] = useState(0);
const [title,setTitle] = useState("");
const [description,setdescription] = useState("");
const [images,setImages] = useState([]);
const [video,setVideo] = useState("");
const [isSpoiler,setisSpoiler] = useState(false);
const [isNSFW,setIsNSFW] = useState(false);
const [subName,setSubName] = useState("");
const [subDescription,setSubDescription] = useState("");
const [subImage,setSubImage] = useState("");
const [subBanner,setSubBanner] = useState("");
const [members,setMembers] = useState([]);
const [isMember,setIsMember] = useState(false);
const [myUserName,setMyUserName] = useState("u/Common-Summer-7186")
const [loading,setLoading] = useState(true);



useEffect(() => {
  async function getSub() {
      setLoading(true);
    try {
      const subs = await handler("/community/get-info", "GET");
      const sub0 = subs;
    
      setSubDescription(sub0.description);
      setSubImage(sub0.image);
      setSubBanner(sub0.communityBanner);
      setMembers(sub0.members);
      setIsMember(sub0.members.includes(myUserName));

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }
  getSub();
}, []);


useEffect(() => {
  async function getPost() {
      setLoading(true);
    try {
      const posts = await handler("/posts", "GET");
      const post0 = posts;
    
      setPostId(post0.postId);
      setUpVotes(post0.votesUpCount);
      setDownVotes(post0.votesDownCount);
      setCommentsCount(post0.commentsCount);
      setTitle(post0.title);
      setdescription(post0.content[0]);
      setSubName(post0.community);
      setImages(post0.images);
      setisSpoiler(post0.isSpoiler);
      setIsNSFW(post0.isNsfw);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }
  getPost();
}, []);


  function convertToEmbedLink(videoLink) {
    // Regular expression to check if the link is a YouTube link
    const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

    if (youtubeRegex.test(videoLink)) {
        // If it's a YouTube link, replace "watch" with "embed"
        return videoLink.replace("/watch?v=", "/embed/");
    } else {
        // If it's not a YouTube link, return the original link
        return videoLink;
    }
}

let video1 = "https://www.youtube.com/watch?v=Sklc_fQBmcs";
let subRedditRules=["rule 1","read rule 1 again",]
video1 = convertToEmbedLink(video1);
const pollOptions = [{votes:5 , option:"Option A"},{votes:5 , option:"Option B"}]


  return (
    <div>
      {loading === true && <h1>Hello World</h1>}
      {loading === false && <div>{console.log(members)}</div>}
      {loading === false && <Post title={title} subRedditName={subName} subRedditDescription={subDescription} subRedditPicture={subImage} banner={subBanner} upVotes={upVotes-downVotes} comments={commentsCount} isSpoiler={isSpoiler} isNSFW={isNSFW} images={images} isMember={isMember} />}
{/*       <Post title={"Post example with multiple images"} subRedditName={"r/aww"} subRedditPicture={"https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd"} images={images} time={"2 days ago"} upVotes={"11k"} comments={"976"} banner={"https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png"} subRedditDescription={"Things that make you go AWW! -- like puppies, bunnies, babies, and so on... Feel free to post original pictures and videos of cute things."} isMember={true} isNSFW={true} />
      <Post title={"post example with a description only"} subRedditName={"r/aww"} subRedditPicture={"https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd"} description={"the description"} time={"1 day ago"} upVotes={"0"} comments={"35"} banner={"https://styles.redditmedia.com/t5_2qs0q/styles/bannerBackgroundImage_7glcgg5ymxp21.png"} isSpoiler={true} pollIsOpen={true} pollOptions={pollOptions}  />
      <Post title={"post example with an embeded youtube video"} subRedditName={"r/youtube"} subRedditPicture={"https://styles.redditmedia.com/t5_2qh44/styles/communityIcon_1vctc2ym3zt51.png"} video={video1} time={"now"} upVotes={"3k"} comments={"0"} subRedditDescription={"r/YouTube is for discussion about YouTube. This is a fan sub, not run or owned by YouTube! Please read the rules: https://www.reddit.com/r/youtube/wiki/index/rules NEVER GIVE OUT YOUR PERSONAL INFORMATION: https://support.google.com/youtube/answer/2802848"} isMember={false} isNSFW={true} isSpoiler={true} /> */}
    </div>
  );
}