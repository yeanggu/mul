import {  BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import Mainlist from "./Mainlist";
import "../css/Header.css";
import "../css/Content.css";
import "../Main.css";




export default function Content(){

  return (
    <div className="white_content">
      <Routes>
        <Route path="/main" element={<Mainlist />}/>
      </Routes>
    </div>
  );
};
