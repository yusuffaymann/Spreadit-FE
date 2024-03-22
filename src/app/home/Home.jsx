import { signOut } from "firebase/auth";
import React, {useEffect, useState} from "react";

function Home(){

    const Logout=()=>{
          localStorage.clear()
          window.location.reload()
          
    }

    return (
        <div>
            <h1>homepage</h1>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}
export default Home;