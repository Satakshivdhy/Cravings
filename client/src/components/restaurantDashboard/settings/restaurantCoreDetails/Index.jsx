import react from "react";
import RestaurantAddress from "./RestaurantAddress";
import RestaurantBankingDocuments from "./RestaurantBankingDocuments";
import RestaurantSocialMediaLinks from "./RestaurantSocialMediaLinks";

const Index =()=>{
    return (
        <>
        <div  className="overflow-y-auto h-full p-2 space-y-2">
            <RestaurantAddress/>
            <RestaurantBankingDocuments/>
            <RestaurantSocialMediaLinks/>
        </div>
        </>
    )
}
export default Index;