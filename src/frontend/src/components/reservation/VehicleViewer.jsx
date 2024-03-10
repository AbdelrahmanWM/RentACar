import React from "react";
import {useContext} from "react";
import {UserContext} from "../../Pages/Root";
import { Link } from 'react-router-dom';
import createReservation from "../../utilities/createReservation";
export default function VehicleViewer({vehicle}) {
    const {user} = useContext(UserContext);
    // set vehicle from date to feb 1st 2024
    // set vehicle to date to feb 6rd 2024
    //////////////////
    // Temporary code
    vehicle.fromDate = new Date("2024/3/9").toDateString();
    vehicle.toDate = new Date("2024/3/15").toDateString();
    //////////////////
    return (
        <div className="flex justify-center">
                <div className="p-5">
                    <div className="block text-sm font-medium justify-end flex text-sky-500 mb-2">
                        <Link to="/">
                            <div className={'hover:text-sky-700 cursor-pointer'}>Change Selection</div>
                        </Link>
                    </div>
                    <div className={'box-border border-inherit border-2 flex justify-center items-center'}>
                        <img src={vehicle.Image}/>
                    </div>
                    <div className={"flex justify-center"}>
                        <div className="mb-2 text-2xl font-bold tracking-tight">{vehicle.fromDate} - {vehicle.toDate} ({computeNumOfDays(vehicle.fromDate,vehicle.toDate)} days)</div>
                    </div>
                    <div className={"flex justify-center"}>
                        <div className="mb-3 font-normal text-stone-600 inline-block">
                            <div >
                                <div className={'block mr-2 mb-2'}>{vehicle.make}</div>
                            </div>
                            <div className={'flex justify-center'}>
                                <div className={'block mb-2'}>{vehicle.price}$/day</div>
                            </div>
                            <div className={'flex justify-center'}>
                                {/* <div className={'block mr-2 mb-2'}>Total: </div> */}
                                {/* <div className={'block mr-2 mb-2'}>{computeTotal(vehicle.fromDate,vehicle.toDate,vehicle.price)}$</div> */}
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-center pb-1"}>
                        <Link to="/reservation/confirmation">
                            <button className={'bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded'}
                                onClick={()=>createReservation(vehicle._id,user.id)}>Book Vehicle</button>
                        </Link>
                    </div>
                    <hr className={'border-1 border-stone-300'}/>
                </div>
        </div>
    );
}

function computeNumOfDays(fromDate, toDate) {
    const from = Date.parse(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    return diffDays;
}


function computeTotal(fromDate, toDate, price) {
    return computeNumOfDays(fromDate, toDate) * price;
}
