import React from "react";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../../context/AuthContext";
import api from "../../../../config/ApiConfig";
import toast from "react-hot-toast";
import RunningLoader from "../../../../assets/runningLoader.gif";
const RestaurantAddress = () => {
  const { user, setUser } = useAuth();

  // Common State variables
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false);
  const [loadingRestaurantError, setLoadingRestaurantError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState();
  const [editingRestaurant, setEditingRestaurant] = useState(false);
  const [restaurantFormData, setRestaurantFormData] = useState({
    restaurantName: restaurantData?.restaurantName || "",
    address: restaurantData?.address || "",
    city: restaurantData?.city || "",
    state: restaurantData?.state || "",
    pinCode: restaurantData?.pinCode || "",
    country: restaurantData?.country || "",
    description: restaurantData?.description || "",
    restaurantType: restaurantData?.restaurantType || "",
    cuisineTypes: restaurantData?.cuisineTypes?.join(", ") || "",
    isOpen: restaurantData?.isOpen || false,
    contactEmail: restaurantData?.contactDetails?.email || "",
    contactPhone: restaurantData?.contactDetails?.phone || "",
    openingTime: restaurantData?.servingHours?.openingTime || "",
    closingTime: restaurantData?.servingHours?.closingTime || "",
    geoLat: restaurantData?.geoLocation?.lat || "",
    geoLon: restaurantData?.geoLocation?.lon || "",
    socialMediaLinks: restaurantData?.socialMediaLinks || [],
  });

  const handleRestaurantChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantFormData({
      ...restaurantFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveRestaurant = async () => {
    try {
      setIsLoading(true);
      const payload = {
        restaurantName: restaurantFormData.restaurantName,
        address: restaurantFormData.address,
        city: restaurantFormData.city,
        state: restaurantFormData.state,
        pinCode: restaurantFormData.pinCode,
        country: restaurantFormData.country,
        geoLocation: {
          lat: restaurantFormData.geoLat,
          lon: restaurantFormData.geoLon,
        },
      };

      // Prepare payload for restaurant update
      console.log("restaurantFormData", restaurantFormData);
      toast.success("Updating restaurant information...");
      const res = await api.put(
        `/restaurant/update-restaurant-address?id=${user._id}`,
        payload,
      );
      setRestaurantData(res.data.data);
      setEditingRestaurant(false);
      toast.success("Restaurant information updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update restaurant",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRestaurant = () => {
    setRestaurantFormData({
      restaurantName: restaurantData?.restaurantName || "",
      address: restaurantData?.address || "",
      city: restaurantData?.city || "",
      state: restaurantData?.state || "",
      pinCode: restaurantData?.pinCode || "",
      country: restaurantData?.country || "",
      description: restaurantData?.description || "",
      restaurantType: restaurantData?.restaurantType || "",
      cuisineTypes: restaurantData?.cuisineTypes?.join(", ") || "",
      isOpen: restaurantData?.isOpen || false,
      contactEmail: restaurantData?.contactDetails?.email || "",
      contactPhone: restaurantData?.contactDetails?.phone || "",
      openingTime: restaurantData?.servingHours?.openingTime || "",
      closingTime: restaurantData?.servingHours?.closingTime || "",
      geoLat: restaurantData?.geoLocation?.lat || "",
      geoLon: restaurantData?.geoLocation?.lon || "",
      socialMediaLinks: restaurantData?.socialMediaLinks || [],
    });
    setEditingRestaurant(false);
  };

  const handleGetLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setRestaurantFormData((prev) => ({
          ...prev,
          geoLat: position.coords.latitude,
          geoLon: position.coords.longitude,
        }));
      });
    } catch (error) {}
  };

  const fetchRestaurantData = async () => {
    try {
      setIsLoadingRestaurant(true);

      const res = await api.get(
        `/restaurant/get-resturant-data?id=${user._id}`,
      );
      setRestaurantData(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred fetching restaurant. Please try again.",
      );
      setLoadingRestaurantError(
        error.response?.data?.message ||
          "Unknown error occurred fetching restaurant. Please try again.",
      );
    } finally {
      setIsLoadingRestaurant(false);
    }
  };

  useEffect(() => {
    // fetchRestaurantData();
  }, [user]);

  return (
    <>
      {/* Restaurant Information Section */}
      {isLoadingRestaurant ? (
        <div className="flex flex-col justify-center items-center h-64">
          <img src={RunningLoader} alt="Loading..." className="w-40 h-40" />
          <span className="text-lg text-(--color-primary) font-semibold mt-2 animate-bounce">
            Fetching Restaurant Information
          </span>
        </div>
      ) : loadingRestaurantError ? (
        <div className="flex flex-col justify-center items-center h-64">
          <span className="text-lg text-(--color-error) font-semibold mt-2">
            {loadingRestaurantError}
          </span>
        </div>
      ) : (
        <>
            <div>
              <div className="bg-(--color-base-100) rounded-lg p-3">
                <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="w-full text-sm font-semibold text-(--color-primary)">
                      Address
                    </h3>
                  </div>

                  {!editingRestaurant ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingRestaurant(true)}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                      >
                        <MdEdit /> Edit
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleGetLocation}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? "Getting Current Location..."
                          : "Get Current Location"}
                      </button>

                      <button
                        onClick={handleSaveRestaurant}
                        className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={handleCancelRestaurant}
                        className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded text-xs"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center">
                  <div className="w-full">
                    <label className="text-xs font-semibold">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={restaurantFormData?.address || ""}
                      onChange={handleRestaurantChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRestaurant}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">City</label>
                    <input
                      type="text"
                      name="city"
                      value={restaurantFormData?.city || ""}
                      onChange={handleRestaurantChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRestaurant}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">State</label>
                    <input
                      type="text"
                      name="state"
                      value={restaurantFormData?.state || ""}
                      onChange={handleRestaurantChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRestaurant}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">Pin Code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={restaurantFormData?.pinCode || ""}
                      onChange={handleRestaurantChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRestaurant}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-semibold">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={restaurantFormData?.country || ""}
                      onChange={handleRestaurantChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingRestaurant}
                    />
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2">
                    <div className="w-full">
                      <label className="text-xs font-semibold">Latitude</label>
                      <input
                        type="text"
                        name="geoLat"
                        value={restaurantFormData?.geoLat || ""}
                        onChange={handleRestaurantChange}
                        placeholder="e.g. 28.6139"
                        className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                        disabled
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-xs font-semibold">Longitude</label>
                      <input
                        type="text"
                        name="geoLon"
                        value={restaurantFormData?.geoLon || ""}
                        onChange={handleRestaurantChange}
                        placeholder="e.g. 77.2090"
                        className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
      )}
    </>
  );
};

export default RestaurantAddress;
