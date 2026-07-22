import React from "react";
import PersonalInformation from "./PersonalInformation";
import RestaurantInformation from "./RestaurantInformation";
import LeagalInformation from "./LeagalInformation";

const Index =()=>{
    return (
        <>
        <div  className="overflow-y-auto h-full p-2 space-y-2">
            <PersonalInformation/>
            <RestaurantInformation/>
            <LeagalInformation/>
        </div>
        </>
    )
}
export default Index;