import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { useSelector, useDispatch } from "react-redux";

import LeftSidebar from "../LeftSideBar/LeftSideBar";
import RightSidebar from "../RightSidebar/RightSidebar";
import AdminNavbar from "../RightSidebar/AdminNavbar";
import { adminCheck } from "../../../redux/action/Admin/AdminAction";

const AdminLayout = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error } = useSelector((state) => state.adminCheck);
  const { userInfo } = userLogin;
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(adminCheck());
      if (error) {
        history("/");
      }
    } else {
      history("/");
    }
  }, [dispatch, userInfo, history, error]);

  return (
    <>
      <div className="wrapper">
        <div className="leftside_menu">
          <LeftSidebar />
        </div>
        <div className="content_page">
          <AdminNavbar />
          <div className="container-fluid">
            <RightSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
