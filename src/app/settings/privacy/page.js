'use client';
import React, { useEffect ,useState} from "react";
import styles from "../account/page.module.css";
import Layout from "../SettingsLayout";
import Blockmute from "../../components/UI/Blockmute";
import Blockedmuted from "../../components/UI/Blockedmuted";

export default function Home() {
    const [userData, setUserData] = useState(null); 
    const [blockedUsers, setBlockedUsers] = useState([]); 
    const [mutedCommunities, setMutedCommunities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3002/settings/privacy');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setUserData(data);
        setBlockedUsers(data.blockedUsers);
        setMutedCommunities(data.mutedCommunities);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
    fetchData();
  }, []);

  if (!userData) {
    // Render loading state or return null
    return <div>Loading...</div>;
  }

  const updateblocked=(newName)=>{
    const newBlockedUsers = [...blockedUsers, { profilename: newName }];
    updatePrivacySettings(newBlockedUsers, mutedCommunities);
    setBlockedUsers(newBlockedUsers);
  }

  const updatemuted=(newName)=>{
    const newMutedCommunities = [...mutedCommunities, { profilename: newName }];
    updatePrivacySettings(blockedUsers, newMutedCommunities);
    setMutedCommunities(newMutedCommunities);
  }
  
  const updatePrivacySettings= async (newBlockedUsers, newMutedCommunities)=> {
    try {
      const response = await fetch('http://localhost:3002/settings/privacy', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ blockedUsers: newBlockedUsers, mutedCommunities: newMutedCommunities })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update privacy settings');
      }
  
      // Handle success response
      console.log('Privacy settings updated successfully');
    } catch (error) {
      console.error('Error updating privacy settings:', error.message);
    }
  }

  const removeProfile = async (profilenameToRemove) => {
    const newBlockedUsers = blockedUsers.filter(profile => profile.profilename !== profilenameToRemove);
    updatePrivacySettings(newBlockedUsers, mutedCommunities);
    setBlockedUsers(newBlockedUsers);
    /* try {
      const response = await fetch(`http://localhost:3002/settings/privacy/blockedUsers/${profilenameToRemove}
      `, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to remove profile');
      }
      // Remove the profile from the local state
      setBlockedUsers(blockedUsers.filter(profile => profile.profilename !== profilenameToRemove));
    } catch (error) {
      console.error('Error removing profile:', error.message);
    } */
  };
  
  const removeProfile2 = async (profilenameToRemove) => {
    const newMutedCommunities = mutedCommunities.filter(profile => profile.profilename !== profilenameToRemove);
    updatePrivacySettings(blockedUsers, newMutedCommunities);
    setMutedCommunities(newMutedCommunities);
    /* try {
      const response = await fetch(`http://localhost:3002/settings/privacy/mutedCommunities/${profilenameToRemove}
      `, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to remove profile');
      }
      // Remove the profile from the local state
      setMutedCommunities(mutedCommunities.filter(profile => profile.profilename !== profilenameToRemove));
    } catch (error) {
      console.error('Error removing profile:', error.message);
    }*/ 
  }; 
  
  return (
    <div className={styles.App}>
            <div className={styles.bigcontainer}>
                <Layout index={2} />
                <div className={styles.sectioncontainer}>
                    <div className={styles.sectionname}>
                        <h1 className={styles.accountheader}>Safety & Privacy</h1>
                        <p className={styles.description}>Manage how we use data to personalize your Reddit experience, and control how other redditors interact with you. To learn more, visit our
                        <a href="https://support.reddithelp.com/hc/en-us/categories/360003246511">Privacy & Security FAQs</a>.</p>
                        <h3 className={styles.subheader}>SAFETY</h3>
                        <hr className={styles.line}></hr>
                    </div>
                    <Blockmute type="People You’ve Blocked" description="Blocked people can’t send you chat requests or private messages." onAdd={(newName) => updateblocked(newName)} inputmsg="BLOCK NEW USER" />
                    {
                      blockedUsers.map((profile,index)=>(
                        <Blockedmuted key={index} profilename={profile.profilename} path={index%2==0 ? 1 : 2} onRemove={removeProfile}/>
                      ))
                    }
                    <Blockmute type="Communities You've Muted" description="Posts from muted communities won't show up in your feeds or recommendations." onAdd={(newName) => updatemuted(newName)} inputmsg="MUTE NEW COMMUNITY"/>
                    {
                      mutedCommunities.map((profile,index)=>(
                        <Blockedmuted key={index} profilename={profile.profilename} path={index%2==0 ? 1 : 2} onRemove={removeProfile2} />
                      ))
                    }
                </div>
            </div>
        </div>
  );
}
