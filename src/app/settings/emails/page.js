'use client'

import Layout from "../SettingsLayout"
import Toogle from "../../components/UI/Switch"
import { useEffect, useState } from "react";
import handler from "../../utils/apiHandler";
import styles from "../emails_messages_notifications.module.css"

export default function Email() {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEzMDI5MjM1fQ.ih5SD2C1dSo96CRDbUGX3E5z9mGvCh37zAGh53Y8z-M"
    const [newFollower, setNewFollower] = useState(false); // Assuming default value is false
    const [chatRequests, setChatRequests] = useState(false); // Assuming default value is false
    const [unsubscribeFromAllEmails, setUnsubscribeFromAllEmails] = useState(false); // Assuming default value is false
    const [loading, setLoading] = useState(true); // Loading indicator
    


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
          try {
            // Fetch user preferences
            const prefsData = await handler("/settings/email", "GET", "", token)
            setNewFollower(prefsData.newFollowerEmail);
            setChatRequests(prefsData.chatRequestEmail);
            setUnsubscribeFromAllEmails(prefsData.unsubscribeAllEmails);
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

        let newPrefsData = {
            newFollowerEmail: newFollower,
            chatRequestEmail: chatRequests,
            unsubscribeAllEmails: unsubscribeFromAllEmails
        };
        
        try {
          // Fetch user preferences
          const prefsData = await handler("/settings/email", "PUT", newPrefsData, token);
          console.log(prefsData);
    
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error (e.g., show error message, retry mechanism)
        }
      }
    
      useEffect(() => {
        if(!loading)
          patchData();
      }, [chatRequests,newFollower,unsubscribeFromAllEmails]);


      if (loading) {
        return (
          <div className={styles.window}>
            <div className={styles.page}>
                <Layout index={5} />
                <div>Loading...</div>
              </div>
            </div>
        ); ;
      }
    
    // Render JSX with fetched data
    return (
        <div className={styles.window}>
            <div className={styles.page}>
                <Layout index={5} />
                <div className={styles.body}>
                    <div className={styles.header}>Manage Emails</div>
                    <div className={styles.subsection}>
                        <h1>MESSAGES</h1>
                        <Toogle optionTitle="Private messages" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Chat requests" isToggled={chatRequests} onToggle={() => {setChatRequests(!chatRequests)}} disabled={unsubscribeFromAllEmails} />
                    </div>
                    <div className={styles.subsection}>
                        <h1>ACTIVTY</h1>
                        <Toogle optionTitle="New user welcome" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Comments on your posts" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Replies to your comments" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Upvotes on your posts" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Upvotes on your comments" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Username mentions" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="New followers" isToggled = {newFollower} onToggle = {() => setNewFollower(!newFollower)} disabled={unsubscribeFromAllEmails} />
                    </div>
                    <div className={styles.subsection}>
                        <h1>NEWSLETTERS</h1>
                        <Toogle optionTitle="Daily Digest" disabled={unsubscribeFromAllEmails} />
                    </div>
                    <div className={styles.subsection}>
                        <h1></h1>
                        <Toogle optionTitle="Unsubscribe from all emails " isToggled = {unsubscribeFromAllEmails} onToggle = {() => setUnsubscribeFromAllEmails(!unsubscribeFromAllEmails)} />
                    </div>
                    </div>
                </div>
            </div>
    );

}
