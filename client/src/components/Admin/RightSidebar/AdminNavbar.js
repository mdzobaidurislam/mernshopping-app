import React from "react";
import {
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="shadow navbar_custom">
        <div className="d-flex w-100 justify-content-between admin_navbar">
          <div>
            <div className="input-group align-items-center p-3">
            <span className="admin_search_i">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                className="form-control admin_form_control"
                placeholder="Search"
              />
              <button type="submit" className="btn btn-primary input-group-text">
                Search
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center admin_dropdown dropdown">
          <img src="./images/profile.png" className="profile_img" alt="" />
            <NavDropdown
              title="Admin"
              menuVariant="dark"
              drop="down"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
