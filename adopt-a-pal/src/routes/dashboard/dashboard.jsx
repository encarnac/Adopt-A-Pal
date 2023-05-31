import { React, useState, useEffect } from "react";
import UseUserPals from '../../modules/UseUserPals';
import UseGetPalById from "../../modules/UseGetPalById";
import UseFetchPalData from "../../modules/UseFetchPalData";
import jwtDecode from 'jwt-decode'
import NavBar from "../../components/navbar";
import Matches from './matches';
import Footer from "../../components/footer";


function Dashboard(props) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const uid = decoded.id;
  const userUrl = `/api/users/${uid}`;
  const userData = UseUserPals(userUrl);

  const [palDataList, loading, error] = UseFetchPalData(userData, token);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar currentPage="dashboard" />
      <Matches palDataList={palDataList} />
      <Footer />
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

//   useEffect(() => {
//     const fetchPalData = async () => {
//       if (userData && userData.pals && userData.pals.length > 0) {
//         try {
//           const palDataPromises = userData.pals.map(async (palId) => {
//             const response = await fetch(`/api/animals/${palId}`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });

//             if (!response.ok) {
//               throw new Error("Failed to fetch data");
//             }

//             const jsonData = await response.json();

//             const {
//               name,
//               added,
//               availability,
//               avatars,
//               breed,
//               dispositions,
//             } = jsonData;

//             const filteredData = {
//               name,
//               added,
//               availability,
//               avatars,
//               breed,
//               dispositions,
//             };

//             return filteredData;
//           });

//           const palData = await Promise.all(palDataPromises);
//           setPalDataList(palData);
//           setLoading(false);
//         } catch (error) {
//           setError(error.message);
//           setLoading(false);
//         }
//       }
//     };

//     fetchPalData();
//   }, [userData, token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <NavBar currentPage="dashboard" />
//       <Matches palDataList={palDataList} />
//       <Footer />
//     </>
//   );
// }

// export default Dashboard;

