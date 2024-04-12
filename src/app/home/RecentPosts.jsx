import styles from "./RecentPosts.module.css";
import MiniaturePost from "./MiniaturePost";
import handler from "../utils/apiHandler";
import { useEffect, useState } from "react";

  function RecentPosts () {

    const [postArray,setPostArray] = useState([]);
    const [loading,setLoading] = useState(true);
    const [subscribedArray, setSubscribedArray] = useState([])
    const [subArray,setSubArray] = useState([]);

    function handleClear () {
      console.log("Clear");
      //api cal to clear recent posts
    }



    // useEffect(() => {
    //   async function getPost() {
    //       setLoading(true);
    //     try {
    //       // const posts = await handler("/posts", "GET");

    //       const post_1 =posts.post1;
    //       const post_2 =posts.post2;
    //       const post_3 =posts.post3;
    //       setPostArray([post_1,post_2,post_3,post_1,post_2,post_3,post_1,post_2,post_3,post_1]);

    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    //   getPost();
    // }, []);

    useEffect(() => {
      async function getPost() {
          setLoading(true);
        try {
  
          
          const posts = await handler(`/home/best`, "GET", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk");//todo change api endpoint according to sortBy state
          console.log(posts)
          setPostArray(posts);
  
          //todo call to subReddit endpoint using the subReddit name in postObject.community to get info about the subReddit of the post then add it to the subArray to be used in populating post component
          const subs = await Promise.all(posts.map(async (postObj) => {
            const data = await handler(`/community/get-info?communityName=${postObj.community}`, "GET", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
            const returnedData = {description: data.description, rules: data.rules, image: "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd",
            communityBanner: "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png",
          }
          console.log(returnedData)
            return returnedData
          }))
          setSubArray(subs)
  
          const getSubscribed = await Promise.all(posts.map(async (postObj) => {
            const data = await handler(`/community/is-subscribed?communityName=${postObj.community}`, "GET", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
          console.log(data)
            return data
          }))
          setSubscribedArray(getSubscribed)
          
          
        
        
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
      getPost();
    }, []);
  


    return(

        <div className={styles.recentPosts}>
            <div className={styles.header}>
                <div className={styles.title}>RECENT POSTS</div>
                <button type="button" className={styles.clear} onClick={() => {handleClear()}}>Clear</button>
            </div>
            {loading === false && <div className={styles.body}>
              {postArray.map((postObject, index) => (
                    <div className={styles.post} key={index}>
                      <MiniaturePost postId={postObject._id} subRedditName={postObject.community} subRedditPicture={subArray[index].image} subRedditDescription={subArray[index].description} subRedditBanner={subArray[index].communityBanner} postTitle={postObject.title} postPictures={[]} upVotes={postObject.votesUpCount - postObject.votesDownCount} comments={postObject.commentsCount} video={[]} isNSFW={postObject.isNsfw} isSpoiler={postObject.isSpoiler} isMember={subscribedArray[index].isSubscribed}/>
                    </div>))}
            </div>}
        </div>
    );


  }

  export default RecentPosts;