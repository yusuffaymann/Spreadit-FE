<<<<<<< Updated upstream
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect} from 'react';
import logo from "../../assets/logoSpreadIt.svg";
import searchicon from "../../assets/search.svg"
import listicon from "../../assets/list.svg"
import chaticon from "../../assets/chat-dots.svg"
import notificationicon from "../../assets/bell.svg"
import createicon from "../../assets/create.svg"
import settingsicon from "../../assets/gear.svg"
import logouticon from "../../assets/logout.svg"
import profilepicture from "../../assets/PP1.png"
import styles from "./Toolbar.module.css"


const ToolBar =({page,loggedin})=>{
    const [showList, setShowList] = useState(false);
    const [showModal,setShowModal]=useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const handleOutSideClick = (event) => {
        if (!ref.current?.contains(event.target)) {;
          setShowList(false);
          setShowModal(false);
        }
      };
  
      window.addEventListener("mousedown", handleOutSideClick);
  
      return () => {
        window.removeEventListener("mousedown", handleOutSideClick);
      };
    }, [ref]);

    return(
        <div className={styles.barcontainer}>
            
                <div className={styles.leftbar} >
                    <Image src={listicon} alt="list icon" className={styles.listicon} onClick={()=> setShowModal(!showModal)}/>
                    <Link className={styles.link} href="/home">
                        <div className={styles.icontitle}>
                        <Image src={logo} alt="Spreadit Logo" className={styles.logo}/>
                        <p className={styles.maintitle}>Spreadit</p>
                        </div>
                    </Link>
                </div>
            <div className={styles.searchbar}>
                <Image src={searchicon} alt="search icon" className={styles.searchicon}/>
                <input className={styles.searchinput} placeholder={`search ${page}`}/>
            </div>
            <div className={styles.rightbar}>
                {!loggedin&&(
                    <Link className={styles.link} href="/login">
                        <button className={styles.loginbutton}>Log In</button>
                    </Link>
                )}
                {loggedin&&(
                    <div className={styles.baricons}>
                        <Link className={styles.link} href="/chats">
                            <Image src={chaticon} alt="chat icon" className={styles.icons} />
                        </Link>
                        <Link className={styles.link} href="/createpost">
                            <div className={styles.createbutton} >
                                <Image src={createicon} className={styles.icons} />
                                <p className={styles.buttondescription}>Create</p>
                            </div>
                        </Link>
                        <Link className={styles.link} href="/notifications">
                            <Image src={notificationicon} alt="notification icon" className={styles.icons} />
                        </Link>
                        <Image src={profilepicture} alt="profile picture" className={styles.profilepicture} onClick={()=> setShowList(!showList)}/> 
                    </div>  
                )}
                {showList&&(
                    <ul className={styles.unorderedlist} ref = {ref} >
                        <Link className={styles.link} href="/profile">
                            <li className={styles.listitem} >
                                <Image src={profilepicture} alt="profile picture" className={styles.icons}/>
                                <p className={styles.itemlabel}>View profile</p>
                            </li>
                        </Link>
                        <li className={styles.listitem}  >
                            <Image src={logouticon} alt="logout icon" className={styles.icons}/>
                            <p className={styles.itemlabel}>Log out</p>
                        </li>
                        <Link className={styles.link} href="/settings/account">
                            <li className={styles.listitem} >
                                <Image src={settingsicon} alt="settings icon" className={styles.icons}/>
                                <p className={styles.itemlabel}>Settings</p>
                            </li>
                        </Link>
                    </ul>
                )}
            </div>
            {showModal&&(
                <div className={styles.modaloverlay}>
                </div>
            )}   
        </div>
    );
}

=======
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect} from 'react';
import logo from "../../assets/logoSpreadIt.svg";
import searchicon from "../../assets/search.svg"
import listicon from "../../assets/list.svg"
import chaticon from "../../assets/chat-dots.svg"
import notificationicon from "../../assets/bell.svg"
import createicon from "../../assets/create.svg"
import settingsicon from "../../assets/gear.svg"
import logouticon from "../../assets/logout.svg"
import profilepicture from "../../assets/PP1.png"
import styles from "./Toolbar.module.css"


const ToolBar =({page,loggedin})=>{
    const [showList, setShowList] = useState(false);
    const [showModal,setShowModal]=useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const handleOutSideClick = (event) => {
        if (!ref.current?.contains(event.target)) {;
          setShowList(false);
          setShowModal(false);
        }
      };
  
      window.addEventListener("mousedown", handleOutSideClick);
  
      return () => {
        window.removeEventListener("mousedown", handleOutSideClick);
      };
    }, [ref]);

    return(
        <div className={styles.barcontainer}>
            
                <div className={styles.leftbar} >
                    <Image src={listicon} alt="list icon" className={styles.listicon} onClick={()=> setShowModal(!showModal)}/>
                    <Link className={styles.link} href="/home">
                        <div className={styles.icontitle}>
                        <Image src={logo} alt="Spreadit Logo" className={styles.logo}/>
                        <p className={styles.maintitle}>Spreadit</p>
                        </div>
                    </Link>
                </div>
            <div className={styles.searchbar}>
                <Image src={searchicon} alt="search icon" className={styles.searchicon}/>
                <input className={styles.searchinput} placeholder={`search ${page}`}/>
            </div>
            <div className={styles.rightbar}>
                {!loggedin&&(
                    <Link className={styles.link} href="/login">
                        <button className={styles.loginbutton}>Log In</button>
                    </Link>
                )}
                {loggedin&&(
                    <div className={styles.baricons}>
                        <Link className={styles.link} href="/chats">
                            <Image src={chaticon} alt="chat icon" className={styles.icons} />
                        </Link>
                        <Link className={styles.link} href="/createpost">
                            <div className={styles.createbutton} >
                                <Image src={createicon} className={styles.icons} />
                                <p className={styles.buttondescription}>Create</p>
                            </div>
                        </Link>
                        <Link className={styles.link} href="/notifications">
                            <Image src={notificationicon} alt="notification icon" className={styles.icons} />
                        </Link>
                        <Image src={profilepicture} alt="profile picture" className={styles.profilepicture} onClick={()=> setShowList(!showList)}/> 
                    </div>  
                )}
                {showList&&(
                    <ul className={styles.unorderedlist} ref = {ref} >
                        <Link className={styles.link} href="/profile">
                            <li className={styles.listitem} >
                                <Image src={profilepicture} alt="profile picture" className={styles.icons}/>
                                <p className={styles.itemlabel}>View profile</p>
                            </li>
                        </Link>
                        <li className={styles.listitem}  >
                            <Image src={logouticon} alt="logout icon" className={styles.icons}/>
                            <p className={styles.itemlabel}>Log out</p>
                        </li>
                        <Link className={styles.link} href="/settings/account">
                            <li className={styles.listitem} >
                                <Image src={settingsicon} alt="settings icon" className={styles.icons}/>
                                <p className={styles.itemlabel}>Settings</p>
                            </li>
                        </Link>
                    </ul>
                )}
            </div>
            {showModal&&(
                <div className={styles.modaloverlay}>
                </div>
            )}   
        </div>
    );
}

>>>>>>> Stashed changes
export default ToolBar;