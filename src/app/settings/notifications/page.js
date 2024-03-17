'use client'
import Layout from "../components/SettingsLayout";
import Toogle from "../components/Switch";
import { useEffect, useState } from "react";
import handler from "../apiHandler";



export default function Notification () {

    const [mentions, setMentions] = useState(false); // Assuming default value is false
    const [comments, setComments] = useState(false); // Assuming default value is false
    const [upvotesComments, setUpvotesComments] = useState(false); // Assuming default value is false
    const [upvotesPosts, setUpvotesPosts] = useState(false); // Assuming default value is false
    const [replies, setReplies] = useState(false); // Assuming default value is false
    const [newFollowers, setNewFollowers] = useState(false); // Assuming default value is false
    const [posts, setPosts] = useState(false); // Assuming default value is false
    const [loading, setLoading] = useState(true); // Loading indicator
    


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
          try {
            // Fetch user preferences
            const prefsData = await handler("/api/v1/me/prefs", "GET")
            setMentions(prefsData.mentions);
            setComments(prefsData.comments);
            setUpvotesComments(prefsData.upvotes);
            setUpvotesPosts(prefsData.upvotes);
            setReplies(prefsData.replies);
            setNewFollowers(prefsData.newFollowers);
            setPosts(prefsData.posts);
    
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., show error message, retry mechanism)
          } finally {
            setLoading(false); // Set loading state to false regardless of success or error
          }
        }
        fetchData();
      }, []);


    async function patchData() {

        let newPrefsData = {
          mentions: mentions,
          comments: comments,
          upvotesComments: upvotesComments,
          upvotesPosts: upvotesPosts,
          replies: replies,
          newFollowers: newFollowers,
          posts: posts
        };
        
        try {
          // Fetch user preferences
          const prefsData = await handler("/api/v1/me/prefs", "PATCH", newPrefsData);
          console.log(prefsData);
    
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error (e.g., show error message, retry mechanism)
        }
      }
    
      useEffect(() => {
        if(!loading)
          patchData();
      }, [mentions,comments,upvotesComments,upvotesPosts,replies,newFollowers,posts]);


      if (loading) {
        return (
          <div className="window">
            <div className="page">
                <Layout index={4} />
                <div>Loading...</div>
              </div>
            </div>
        ); ;
      }
    
    // Render JSX with fetched data
    return (
        <div className="window">
            <div className="page">
                <Layout index={4} />
                <div className="body">
                <div className="header">Notification settings</div>
                <div className="messages">
                <h1>MESSAGES</h1>
                <Toogle optionTitle="Private messages" />
                <Toogle optionTitle="Chat messages" />
                <Toogle optionTitle="Chat requests" />
                </div>
                <div className="activity">
                <h1>ACTIVTY</h1>
                <Toogle optionTitle="Mentions of u/username" isToggled = {mentions} onToggle = {() => setMentions(!mentions)} />
                <Toogle optionTitle="Comments on your posts" isToggled = {comments} onToggle = {() => setComments(!comments)} />
                <Toogle optionTitle="Upvotes on your posts" isToggled = {upvotesPosts} onToggle = {() => setUpvotesPosts(!upvotesPosts)} />
                <Toogle optionTitle="Upvotes on your comments" isToggled = {upvotesComments} onToggle = {() => setUpvotesComments(!upvotesComments)} />
                <Toogle optionTitle="Replies to your comments" isToggled = {replies} onToggle = {() => setReplies(!replies)} />
                <Toogle optionTitle="Activity on your comments" />
                <Toogle optionTitle="Activity on chat posts you're in" />
                <Toogle optionTitle="New followers" isToggled = {newFollowers} onToggle = {() => setNewFollowers(!newFollowers)} />
                <Toogle optionTitle="Awards you receive" />
                <Toogle optionTitle="Posts you follow" isToggled = {posts} onToggle = {() => setPosts(!posts)} />
                <Toogle optionTitle="Comments you follow" />
                </div>
                <div className="recommendations">
                <h1>RECOMMENDATIONS</h1>
                <Toogle optionTitle="Trending posts" />
                <Toogle optionTitle="Community recommendations" />
                <Toogle optionTitle="ReReddit" />
                <Toogle optionTitle="Featured content" />
                </div>
                <div className="updates">
                <h1>UPDATES</h1>
                <Toogle optionTitle="Reddit announcements" />
                <Toogle optionTitle="Cake day" />
                </div>
            </div>
        </div>
      </div>
    );

}
