import { React, useState, useEffect } from "react";
import UseUserPals from "../../modules/UseUserPals";
import UseGetPalById from "../../modules/UseGetPalById";
import UseFetchPalData from "../../modules/UseFetchPalData";
import jwtDecode from "jwt-decode";
import NavBar from "../../components/navbar";
import Matches from "./matches";
import Listings from "./listings";
import Footer from "../../components/footer";

function Dashboard(props) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const uid = decoded.id;
  const userUrl = `/api/users/${uid}`;
  const userData = UseUserPals(userUrl);
  const admin = userData.email === "admin@adoptapal.com" ? true : false;
  const [show, setShow] = useState(null); // State of "Listings/New Post" visibility for admin

  const [palDataList, loading, error] = UseFetchPalData(userData, token);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const showNewPost = () => {
    setShow(!show);
  };

  return (
    <>
      {/* <NavBar currentPage="admin" showNewPost={showNewPost} />
      <Listings uid={uid} show={show} showNewPost={showNewPost} /> */}
      {admin ? (
        <>
          <NavBar currentPage="admin" showNewPost={showNewPost} />
          <Listings uid={uid} show={show} showNewPost={showNewPost} />
        </>
      ) : (
        <>
          <NavBar currentPage="dashboard" />
          <Matches palDataList={palDataList} loading={loading} uid={uid} />
        </>
      )}
      <Footer />
    </>
  );
}

export default Dashboard;
