import styles from "./RecentPosts.module.css";
import MiniaturePost from "./MiniaturePost";
import handler from "../utils/apiHandler";
import { useEffect, useState } from "react";

  function RecentPosts () {

    const [postArray,setPostArray] = useState([]);
    const [loading,setLoading] = useState(true);

    function handleClear () {
      console.log("Clear");
      //api cal to clear recent posts
    }



    useEffect(() => {
      async function getPost() {
          setLoading(true);
        try {
          const posts = await handler("/posts", "GET");

          const post_1 =posts.post1;
          const post_2 =posts.post2;
          const post_3 =posts.post3;
          setPostArray([post_1,post_2,post_3,post_1,post_2,post_3,post_1,post_2,post_3,post_1]);

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
                      <MiniaturePost subRedditName={postObject.community} subRedditPicture={postObject.images[1]} subRedditDescription={"asdasda"} subRedditBanner={postObject.images[2]} postTitle={postObject.title} postPicture={postObject.images[0]} upVotes={postObject.votesUpCount - postObject.votesDownCount} comments={postObject.commentsCount} video={postObject.videos} isNSFW={postObject.isNsfw} isSpoiler={postObject.isSpoiler} />
                    </div>))}
            </div>}
        </div>
    );


  }

  export default RecentPosts;