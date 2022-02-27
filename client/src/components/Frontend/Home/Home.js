import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Home;
