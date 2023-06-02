import { React, useState, useEffect } from "react";
import UseUserPals from '../../modules/UseUserPals';
import UseGetPalById from "../../modules/UseGetPalById";
import UseFetchPalData from "../../modules/UseFetchPalData";
import jwtDecode from 'jwt-decode'
import NavBar from "../../components/navbar";
import Matches from './matches';
import Footer from "../../components/footer";
import FadeAnimation from "../../modules/FadeAnimation";
import "../../styles.css";


function Dashboard(props) {
  const [show, setShow] = useState(true);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const uid = decoded.id;
  const userUrl = `/api/users/${uid}`;
  const userData = UseUserPals(userUrl);

  const [palDataList, loading, error] = UseFetchPalData(userData, token);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <> 
      <NavBar currentPage="dashboard" />
      <FadeAnimation show={show}>
        <Matches palDataList={palDataList} loading={loading} />
      </FadeAnimation>
      <Footer />
    </>
  );
}

export default Dashboard;
