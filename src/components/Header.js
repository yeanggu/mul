import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../css/Header.css";
import "../css/Main.css";
import logo from "../image/muleoba_logo.png";
import {
  FaBell,
  FaBars,
  FaSearch,
  FaTrophy,
  FaWindowClose,
} from "react-icons/fa";

export default function Header() {
  //const alarmRef = useRef(null);
  const [alarm, setAlarm] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  /* 외부 영역을 클릭했을 때 알람창이 닫히도록 
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        alarmRef.current &&
        !alarmRef.current.contains(event.target)
      ) {
        setAlarm(false); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [alarmRef]);
*/
  return (
    <div className="header">
      <div className="container ">
        <div className="header_flex">
          <div className="header_left">
            <div className="header_logo_box">
              <NavLink to="/main">
                <img src={logo} className="header_logo" />
              </NavLink>
            </div>
            <div className="header_searchBar">
              <input type="text" placeholder="물품 검색" />
              <FaSearch className="header_searchIcon" />
            </div>
          </div>
          <div className="header_right">
            <div className="header_ranking">
              <div className="header_rankingIcon">
                <FaTrophy className="header_ranking_icon" />
              </div>
              <div className="header_ranking_box">
                <div className="header_rankingNumber">3</div>
                <div className="header_rankingNickname">의왕시피바다</div>
              </div>
            </div>
            <div className="header_bell">
              <FaBell
                className="header_bellIcon"
                onClick={() => setAlarm(!alarm)}
              />
            </div>
            <div className="header_menuBar">
              <NavLink to="">
                <FaBars className="header_barIcon" onClick={showSidebar} />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="header_alarm_bar">
          {alarm ? (
            <div>
              <div className="header_alarm_arrow"></div>
              <div className="header_alarm_box">알람</div>
            </div>
          ) : null}
        </div>
      </div>
      <nav className={sidebar ? "header_sideMenu active" : "header_sideMenu"}>
        <ul className="header_sideMenu_items">
          <li className="header_sideMenu_toggle">
            <NavLink to="#">
              <FaWindowClose
                className="header_closeIcon"
                onClick={showSidebar}
              />
            </NavLink>
          </li>
          <li className="header_sideMenu_text">
            <NavLink to="/" onClick={showSidebar}>
              Home
            </NavLink>
          </li>
          <li className="header_sideMenu_text">
            <NavLink to="/main/mypage/mylist" onClick={showSidebar}>
              마이페이지
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
