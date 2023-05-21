import { React, useState } from "react";
import UseUserPals from '../../modules/UseUserPals';
import jwtDecode from 'jwt-decode'

function Dashboard( props ) 
{
    

    // const uid = 5704134103662592; // Replace with the actual eid value
    const token = localStorage.getItem('token');
    
    const decoded = jwtDecode(token)
    const uid = decoded.id;
    const url = `/api/users/${uid}`;
    console.log(url);
    // console.log("token before:");
    // console.log(token);
    return (
        <div>
        <h1>User Pals</h1>

        < UseUserPals url={url} />
        </div>
    );
    

}


export default Dashboard;