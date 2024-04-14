import styles from "./RecentPosts.module.css";
import MiniaturePost from "./MiniaturePost";
import handler from "../utils/apiHandler";
import { useEffect, useState } from "react";
import getCookies from "../utils/getCookies";

  function RecentPosts () {

    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEzMDI5MjM1fQ.ih5SD2C1dSo96CRDbUGX3E5z9mGvCh37zAGh53Y8z-M";
    const [token, setToken] = useState(null);
    const [postArray,setPostArray] = useState([]);
    const [loading,setLoading] = useState(true);
    const [subArray,setSubArray] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const cookies = await getCookies();
        if(cookies !== null && cookies.access_token && cookies.username){
          setToken(cookies.access_token);
  
        } else {
          router.push("/login")
        }
  
      }
      fetchData();
    }, []);

    function handleClear () {
      console.log("Clear");
      //api cal to clear recent posts
    }


    useEffect(() => {
      if(token === null) return
      async function getPosts() {
        setLoading(true);
        try {
            const posts = await handler(`/home/best`, "GET", "", token);//todo change api endpoint according to sortBy state
            console.log(posts);

            setPostArray([...postArray, ...posts]);
          } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
      getPosts();
    },[token]);

    useEffect(() => {
      if(token === null) return
      async function getRemainingData() {
        try {
        const subsPromises = postArray.map(async (postObj) => {
          const subData = await handler(`/community/get-info?communityName=${postObj.community}`, "GET", "", token);
          const subscribed = await handler(`/community/is-subscribed?communityName=${postObj.community}`, "GET", "", token);
          return { ...subData, ...subscribed};
          /* return { description: subData.description, rules: subData.rules, image: "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd", communityBanner: "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png", ...subscribed}; */
      });
        const subs = await Promise.all(subsPromises);
        setSubArray([...subArray, ...subs]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    getRemainingData();
    },[postArray])

/*     useEffect(() => {
      async function getPost() {
          setLoading(true);
        try {
  
          
          const posts = await handler(`/home/best`, "GET", "", token);//todo change api endpoint according to sortBy state
          setPostArray(posts);
  
          //todo call to subReddit endpoint using the subReddit name in postObject.community to get info about the subReddit of the post then add it to the subArray to be used in populating post component
          const subs = await Promise.all(posts.map(async (postObj) => {
            const data = await handler(`/community/get-info?communityName=${postObj.community}`, "GET", "", token)
            return data;
          }))
          setSubArray(subs)
  
          const getSubscribed = await Promise.all(posts.map(async (postObj) => {
            const data = await handler(`/community/is-subscribed?communityName=${postObj.community}`, "GET", "", token)
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
    }, []); */
  


    return(

        <div className={styles.recentPosts}>
            <div className={styles.header}>
                <div className={styles.title}>RECENT POSTS</div>
                <button type="button" className={styles.clear} onClick={() => {handleClear()}}>Clear</button>
            </div>
            {loading === false && <div className={styles.body}>
              {postArray.map((postObject, index) => (
                    <div className={styles.post} key={index}>
                      <MiniaturePost postId={postObject._id} subRedditName={postObject.community}  subRedditPicture={subArray[index] ? subArray[index].image : ""} subRedditDescription={subArray[index] ? subArray[index].description : ""} banner={subArray[index] ? subArray[index].communityBanner : ""} postTitle={postObject.title} attachments={postObject.attachments} upVotes={postObject.votesUpCount - postObject.votesDownCount} comments={postObject.commentsCount} isNSFW={postObject.isNsfw} isSpoiler={postObject.isSpoiler} isMember={subArray[index] ? subArray[index].isSubscribed : true}/>
                    </div>))}
            </div>}
        </div>
    );


  }

  export default RecentPosts;