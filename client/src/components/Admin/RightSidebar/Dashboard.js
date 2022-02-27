import React from "react";
const Dashboard = () => {
  return ( 
    <div className="row">
      <div className="col-12">
        <div className="page_title_box d-flex justify-content-between align-items-center">
          <h4 className="page_title">Dashboard</h4>
          <div className="page_title_right">
            <form className="d-flex">
              <div className="input-group">
                <input
                  type="date"
                  className="form-control form-control-light admin_form_control"
                  id="dash-daterange"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
