import { React, useState } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";

function Browse(props) {

  return (
    <>
      <NavBar currentPage={ "browse" } />
      <Footer />

    </>
  );
}

export default Browse;
