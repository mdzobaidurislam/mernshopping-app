import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" style={{ width:'8rem',height:'8rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
};

export default Loader;
