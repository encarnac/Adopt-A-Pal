import { React, useState } from "react";
import UseUserPals from '../../modules/UseUserPals';

function Dashboard( props ) 
{
    const uid = 5704134103662592; // Replace with the actual eid value

    return (
        <div>
        <h1>User Pals</h1>

        < UseUserPals url={`/api/users/${uid}`} />
        </div>
    );
    

}


export default Dashboard;