import { React, useState, useEffect } from "react";
import UseUserPals from '../../modules/UseUserPals';
import UseGetPalById from "../../modules/UseGetPalById";
import UseFetchPalData from "../../modules/UseFetchPalData";
import jwtDecode from 'jwt-decode'
import NavBar from "../../components/navbar";
import Matches from './matches';
import Footer from "../../components/footer";


function Dashboard(props) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const uid = decoded.id;
  const userUrl = `/api/users/${uid}`;
  const userData = UseUserPals(userUrl);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [palDataList, setPalDataList] = useState([]);
  console.log("user data:", userData);

  useEffect(() => {
    if (userData && userData.pals) {
      const fetchPalData = async () => {
        try {
          const pallist = ["5700433016258560", "5731076903272448"];
          const promises = pallist.map((palId) =>
            UseGetPalById(palId)
          );
          const palDataList = await Promise.all(promises);
          setPalDataList(palDataList);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching pal data:', error);
          setError(error.message);
          setLoading(false);
        }
      };

      fetchPalData();
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* <NavBar currentPage="dashboard" /> */}
      {/* <Matches palDataList={palDataList} /> */}
      {/* <Footer /> */}
    </>
  );
}

export default Dashboard;



// function Dashboard(props) {
//   const token = localStorage.getItem('token');
//   const decoded = jwtDecode(token);
//   const uid = decoded.id;
//   const userUrl = `/api/users/${uid}`;
//   const userData = UseUserPals(userUrl);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [palDataList, setPalDataList] = useState([]);
//   console.log("user data:", userData);



//   // const { loading, palDataList, error } = UseFetchPalData(userData?.pals || []);
//   useEffect(() => {
//     if (userData && userData.pals) {
//       const fetchPalData = async () => {
//         try 
//         {
//           const promises = userData.pals.map((palId) =>
//             UseGetPalById(palId)
//           );
//           const palDataList = await Promise.all(promises);
//           setPalDataList(palDataList);
//           setLoading(false);
//         } 
//         catch (error) 
//         {
//           console.error('Error fetching pal data:', error);
//           setError(error.message);
//           setLoading(false);
//         }
//       };
//       fetchPalData();
//     }
//   }, [userData]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (error) {
//     return <div>Error: {error}</div>;
//   }


//   return (
//     <>
//       {/* <NavBar currentPage="dashboard" /> */}
//       {/* <Matches palDataList={palDataList} /> */}
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default Dashboard;