import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../css/Mainlist.css";
import { FaRegHandPaper, FaRegEdit } from "react-icons/fa";
import { connect } from "react-redux";
import { uID } from "../redux/idReducer";
import { SET_POST } from "../redux/searchReducer";
//import { setPosts } from "../redux/Action";

const mapStateToProps = (state) => {
  return {
    searchData: state.searchReducer.searchData,
  };
};

function Mainlist({ searchData }) {
  const uID = useSelector((state) => state.idReducer.uID);

  const [lists, setLists] = useState([]);
  const [pages, setPages] = useState(9);
  const [category, setCategory] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    // console.log(searchData.length);
    getList();
    getUser();
  }, [uID]);

  useEffect(() => {
    setPages(9);
    getList();
  }, [category]);

  useEffect(() => {
    setPages(9);
    setLists(searchData);
  }, [searchData]);

  useEffect(() => {
    if (searchData.length >= 1) {
      console.log("검색구역");
      setLists(searchData);
    } else {
      console.log("전체구역");
      getList();
    }
  }, [pages]);

  async function getList() {
    await axios
      .get("/muleoba/mainList", { params: { uID, category } })
      .then((response) => {
        setLists(response.data.slice(0, pages));
        // console.log(pages);
        // console.log(uID);
        // console.log(category);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getUser() {
    await axios
      .get("/muleoba/user", { params: { uID } })
      .then((response) => {
        setUser(response.data);
        // console.log(response.data);
        // console.log(uID);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onClickPlusPage = (e) => {
    // console.log(pages);

    if (searchData.length >= 1) {
      console.log("검색구역");
      setLists(searchData);
      setPages(pages + 9);
    } else {
      console.log("전체구역");
      getList();
      setPages(pages + 9);
    }
  };

  const onChangeCate = (e) => {
    setCategory(e.target.value === "전체" ? null : e.target.value);
  };

  return (
    <div className="mainlist">
      <div className="mainlist_head">
        <div className="mainlist_head_title">
          <div className="mainlist_head_text">최신등록한 물품</div>
          <div className="mainlist_head_area">{user.address}</div>
        </div>
        <div className="mainlist_head_right">
          <div className="mainlist_head_cate_box">
            <select
              className="mainlist_head_cate"
              onChange={(e) => onChangeCate(e)}
            >
              <option>전체</option>
              <option>패션의류/잡화</option>
              <option>뷰티</option>
              <option>출산/유아동</option>
              <option>식품</option>
              <option>주방용품</option>
              <option>생활용품</option>
              <option>홈인테리어</option>
              <option>가전디지털</option>
              <option>스포츠/레저</option>
              <option>자동차용품</option>
              <option>도서/음반/DVD</option>
              <option>완구/취미</option>
              <option>문구/오피스</option>
              <option>반려동물용품</option>
              <option>헬스/건강식품</option>
            </select>
          </div>
          <NavLink to="/main/item" className="mainlist_insert_post">
            <div className="mainlist_insert_postbox">
              물품등록
              <FaRegEdit className="mainlist_insert_icon" />
            </div>
          </NavLink>
        </div>
      </div>
      <hr />
      <div className="mainlist_content">
        {lists
          ? lists.map((list) => {
              let address = "/img/" + list.photo;
              return (
                <NavLink
                  to={`detail/${list.iid}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="mainlist_detailbox" key={list.item}>
                    <div className="mainlist_detail">
                      <div className="mainlist_detail_photo">
                        <img src={address} />
                      </div>
                      <div className="mainlist_detail_text">
                        <div className="mainlist_detail_cate">
                          {list.category}
                        </div>
                        <div className="mainlist_detail_item">{list.item}</div>
                      </div>
                      <div className="mainlist_detail_requestnum_box">
                        <div className="mainlist_detail_requestnum">
                          <FaRegHandPaper className="mainlist_detail_requesticon" />
                          {list.requestNum}
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            })
          : null}
      </div>
      <div className="mainlist_plus_box" onClick={(e) => onClickPlusPage(e)}>
        더보기
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Mainlist);
