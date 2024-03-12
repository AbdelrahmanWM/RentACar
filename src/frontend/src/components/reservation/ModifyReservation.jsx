import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ReservationDetails from "./ReservationDetails.jsx";
import VehicleDetails from "./VehicleDetails.jsx";
import {UserContext} from "../../Pages/Root.jsx";
import cancelReservation from "../../utilities/cancelReservation";
export default function ModifyReservation() {
    // variable with the reservation id from url
    const reservationId = window.location.pathname.split("/").pop();
    //////////////////////////////////////////////////////////////
    const {user} = useContext(UserContext);
    const [response,setResponse] = useState([]);
    console.log(user);
    useEffect(()=>{
       
        async function fetchReservation(){
            let response = await fetch(`http://localhost:3000/api/reservations/${reservationId}`,{
                method: "GET",
                credentials: "include", // Include cookies in the request
                mode: "cors", // Enable CORS
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            response = await response.json();
            setResponse(response);
            console.log(response);
        }

        fetchReservation();
    },[user])
    //////////////////////////////////////////////////////////////
    if(response!==undefined && response.vin!==undefined){
        return (

            <div className="p-6 my-6 mx-10 bg-white rounded-md shadow-2xl shadow-stone-300">
                <table>
                    <thead>
                    <tr>
                        <th><h2>VEHICLE DETAILS</h2><hr className={"pb-1"}/></th>
                        <th><h2>RESERVATION DETAILS</h2><hr className={"pb-1"}/></th>
                    </tr>
                    </thead>
                    <tr>
                        <td className={"w-1/2"}>
                            <VehicleDetails vehicle={response.vin} />
                        </td>
                        <td className={"w-1/2"}>
                            <ReservationDetails reservation={response}  />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Link to="/user/reservation"><button className="mt-5 float-left bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Back</button></Link>
                            { (new Date(response.returnDate) > new Date()) ? <button className="mt-5 float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={(e)=>cancel(reservationId)}>Cancel</button>
                            : null}
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}


function cancel(reservationId) {
// show confirmation dialog
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
        cancelReservation(reservationId);
        window.location.href = "/user/reservation";
    }

}