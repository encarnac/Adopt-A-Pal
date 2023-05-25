import { React, useState, useEffect, useCallback } from "react";
import UseUserPals from '../../modules/UseUserPals';
import UseGetPalById from "../../modules/UseGetPalById";
import jwtDecode from 'jwt-decode'
import NavBar from "../../components/NavBar";
import Matches from './matches';
import Footer from "../../components/Footer";


async function fetchPalData(pals) {
    const palDataList = await Promise.all(
      pals.map(async (palId) => {
        const palData = await UseGetPalById(palId);
        return palData;
      })
    );
    return palDataList;
  }

function Dashboard(props) {

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const uid = decoded.id;
  const userUrl = `/api/users/${uid}`;
  const userData = UseUserPals( userUrl );
//   const palDatatest = UseGetPalById("5700433016258560");
//   console.log(palDatatest);
  const [palData, setPalData] = useState([]);
  console.log("userData:", userData);

  useEffect(() => {
    if (userData && userData.pals) {
    // if (userData) {
        console.log("here2");
      const fetchData = async () => {
        const palDataList = await fetchPalData(userData.pals);
        setPalData(palDataList);
      };

    //   fetchData();
    }
  }, [userData]);
  
  return (
    <>
      <NavBar currentPage={"dashboard"} />
      <div>
        {/* <h1>User Pals</h1>
        <div> ---- </div> */}
        {palData.map((pal, index) => (
          <div key={index}>
            {pal.loading && <div>Loading...</div>}
            {pal.error && <div>Error: {pal.error}</div>}
            {pal.data && <pre>{JSON.stringify(pal.data, null, 2)}</pre>}
          </div>
        ))}
      </div>
      <Matches />
      <Footer />
    </>
  );
}

export default Dashboard;
