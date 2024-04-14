'use client'

import Layout from "../SettingsLayout";
import List from "../../components/UI/Listbutton"
import { useEffect, useState } from "react";
import handler from "../../utils/apiHandler";
import styles from "../emails_messages_notifications.module.css"
import Button from "../../components/UI/Changebutton"
import Add from "../../components/UI/Blockmute"
import AddedList from "../../components/UI/Blockedmuted"

export default function messaging() {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEzMDI5MjM1fQ.ih5SD2C1dSo96CRDbUGX3E5z9mGvCh37zAGh53Y8z-M"
    const [privateMesssages, setPrivateMessages] = useState("Everyone");
    const [chatRequests, setChatRequests] = useState("Everyone");
    const [markAllAsRead, setMarkAllAsRead] = useState(false);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading indicator
    const chatRequestOptionsUpper = ["EVERYONE", "ACCOUNTS OLDER THAN 30 DAYS", "NOBODY"];
    const privateMessagesOptionsUpper = ["EVERYONE", "NOBODY"];
    const showApprovedUsers = (chatRequests !== "Everyone" || privateMesssages !== "Everyone" );

    function capitalizeFirstLetters(str) {
      const lowerString = str.toLowerCase();
      return lowerString.replace(/(^\w|\s\w)/g, match => match.toUpperCase());
    }
    


    useEffect(() => {
        async function fetchData() {
            try { 
              setLoading(true);
              // Fetch user preferences
              const prefsData = await handler("/settings/chat-and-messaging", "GET", "", token)
              setPrivateMessages(prefsData.sendYouPrivateMessages);
              setChatRequests(prefsData.sendYouFriendRequests);
              setApprovedUsers(prefsData.approvedUsers);
              console.log(prefsData);
        
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
/*       let temporaryChatRequests = chatRequests;
      if(chatRequests === "Accounts older than 30 days")
      {
        temporaryChatRequests="Accounts Older Than 30 Days";
      } */
      console.log(chatRequests);
        let newPrefsData = {
          sendYouFriendRequests: chatRequests,
          sendYouPrivateMessages: privateMesssages,
          approvedUsers: approvedUsers
        };
        
        try {
          // patch user preferences
          const prefsData = await handler("/settings/chat-and-messaging", "PUT", newPrefsData, token);
          if(markAllAsRead === true)
          {
            const markRead = await handler("/settings/chat-and-messaging/mark-as-read", "POST", {markAllChatsAsRead: true}, token);
            setMarkAllAsRead(false);
            console.log(markRead);
          }
          console.log(prefsData);
    
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error (e.g., show error message, retry mechanism)
        }
      }
    
      useEffect(() => {
        if(!loading)
          patchData();
      }, [chatRequests,privateMesssages,markAllAsRead,approvedUsers]);


      if (loading) {
        return (
          <div className={styles.window}>
            <div className={styles.page}>
                <Layout index={7} />
                <div>Loading...</div>
              </div>
            </div>
        ); ;
      }
    
    // Render JSX with fetched data
    return (
        <div className={styles.window}>
            <div className={styles.page}>
                <Layout index={7} />
                <div className={styles.body}>
                    <div className={styles.header}>Chat & Messaging</div>
                    <div className={styles.subsection}>
                        <List list= {chatRequestOptionsUpper} initialv={chatRequests.toUpperCase()} type={"Who can send you chat requests"} displayedColor={"grey"} choose={(item) => {setChatRequests(capitalizeFirstLetters(item))}}/>
                        <List list= {privateMessagesOptionsUpper} initialv={privateMesssages.toUpperCase()} type={"Who can send you private messages"} description={"Heads up—Reddit admins and moderators of communities you’ve joined can message you even if they’re not approved."} displayedColor={"grey"} choose={(item) => {setPrivateMessages(capitalizeFirstLetters(item))}} />
                        {showApprovedUsers && (
                        <div style={{ paddingLeft: "32px" }}>
                        <Add type={"Approved Users"} description={"Approved users can always send you private messages."} inputmsg={"ADD NEW USER TO APPROVED LIST"} onAdd={(newName) => setApprovedUsers([...approvedUsers, {profilename: newName}])} />
                        {
                          approvedUsers.map((profile,index)=>(
                            <AddedList key={index} profilename={profile.profilename} path={index%2==0 ? 1 : 2} onRemove={(profilenameToRemove) => {setApprovedUsers(approvedUsers.filter(profile => profile.profilename !== profilenameToRemove))}}/>
                          ))
                        }
                        </div> )}
                        <Button type={"Mark all as read"} description={"Mark all conversations and invites as read."} display={"Mark as Read"} activate={() => {setMarkAllAsRead(true)}} />
                    </div>
                </div>
            </div>
        </div>
    );

}
