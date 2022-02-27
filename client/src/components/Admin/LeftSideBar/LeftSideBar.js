import React from "react";
import { NavLink } from "react-router-dom";

import { FaProductHunt, FaHome, } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
const LeftSidebar = () => {
  let activeClassName = "admin_active_nav";

  return (
    <>
      <NavLink to="/" className="left_logo">
        Shopping App
      </NavLink>
      <div className="sidebar_menu_area">
        <ul className="admin_site_nav">
          <li>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <i>
                <FaHome />
              </i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <i>
                <FaProductHunt />
              </i>
              <span>Products</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="addproduct"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <i>
                <AiFillFileAdd />
              </i>
              <span>Add new Product</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LeftSidebar;
