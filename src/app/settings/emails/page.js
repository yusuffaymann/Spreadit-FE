'use client'

import Layout from "../components/SettingsLayout";
import Toogle from "../components/Switch";
import { useEffect, useState } from "react";
import handler from "../apiHandler";

export default function Email() {

    const [newFollower, setNewFollower] = useState(false); // Assuming default value is false
    const [chatRequests, setChatRequests] = useState(false); // Assuming default value is false
    const [unsubscribeFromAllEmails, setUnsubscribeFromAllEmails] = useState(false); // Assuming default value is false
    const [loading, setLoading] = useState(true); // Loading indicator
    


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
          try {
            // Fetch user preferences
            const prefsData = await handler("/api/v1/me/prefs", "GET")
            setNewFollower(prefsData.email_user_new_follower);
            setChatRequests(prefsData.email_chat_request);
            setUnsubscribeFromAllEmails(prefsData.email_unsubscribe_all);
    
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
            email_user_new_follower: newFollower,
            email_chat_request: chatRequests,
            email_unsubscribe_all: unsubscribeFromAllEmails
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
      }, [chatRequests,newFollower,unsubscribeFromAllEmails]);


      if (loading) {
        return (
          <div className="window">
            <div className="page">
                <Layout index={5} />
                <div>Loading...</div>
              </div>
            </div>
        ); ;
      }
    
    // Render JSX with fetched data
    return (
        <div className="window">
            <div className="page">
                <Layout index={5} />
                <div className="body">
                    <div className="header">Manage Emails</div>
                    <div className="messages">
                        <h1>MESSAGES</h1>
                        <Toogle optionTitle="Private messages" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Chat requests" isToggled={chatRequests} onToggle={() => {setChatRequests(!chatRequests)}} disabled={unsubscribeFromAllEmails} />
                    </div>
                    <div className="activity">
                        <h1>ACTIVTY</h1>
                        <Toogle optionTitle="New user welcome" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Comments on your posts" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Replies to your comments" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Upvotes on your posts" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Upvotes on your comments" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="Username mentions" disabled={unsubscribeFromAllEmails} />
                        <Toogle optionTitle="New followers" isToggled = {newFollower} onToggle = {() => setNewFollower(!newFollower)} disabled={unsubscribeFromAllEmails} />
                    </div>
                    <div className="newsletters">
                        <h1>NEWSLETTERS</h1>
                        <Toogle optionTitle="Daily Digest" disabled={unsubscribeFromAllEmails} />
                    </div>
                    <div className="unnsubscribe">
                        <h1></h1>
                        <Toogle optionTitle="Unsubscribe from all emails " isToggled = {unsubscribeFromAllEmails} onToggle = {() => setUnsubscribeFromAllEmails(!unsubscribeFromAllEmails)} />
                    </div>
                    </div>
                </div>
            </div>
    );

}
