import React, {useEffect, useState} from "react";
import Sidebar from "../components/UI/Sidebar";
import "./Home.css";

function Home(){
    return (
        <div className="home">
            <Sidebar/>
            <h1>homepage</h1>
        </div>
    )
}
export default Home;