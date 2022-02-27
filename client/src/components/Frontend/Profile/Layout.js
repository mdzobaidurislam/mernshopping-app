import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Col, Image, Nav, ProgressBar, Row } from "react-bootstrap";
import "./Profile.css";
const Layout = () => {


    const now = 60;

    const progressInstance = <ProgressBar now={now} className="mt-2 w-75 profile_progress pr-2" />;
  return (
    <>
      <Row className="mt-5 mb-5 user_section">
        <Col md={3}>
        <div className="user_profile shadow ">
            <div className="text-center">
            <Image src="/images/profile.png" className="fluid w-25 thumbnail rounded-3"/>
            <div className="main_progressbar d-flex items-center justify-content-center">
            {progressInstance} <span>60%</span>
            </div>
            </div>
            <Nav className="flex-column ">
            <NavLink to="profile"> <i className="fa fa-user"></i> Profile</NavLink>
            <NavLink to="orders">Order</NavLink>
            <NavLink to="dashboard">Dashboard</NavLink>
          </Nav>
        </div>
        
         
        </Col>
        <Col md={9} className="shadow p-4">
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default Layout;
