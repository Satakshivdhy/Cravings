import React from "react";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../../context/AuthContext";
import api from "../../../../config/ApiConfig";
import toast from "react-hot-toast";
import RunningLoader from "../../../../assets/runningLoader.gif";

const RestaurantSocialMediaLinks = () => {
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

  const handleSocialMediaChange = (index, field, value) => {
    const updated = restaurantFormData.socialMediaLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    );
    setRestaurantFormData({ ...restaurantFormData, socialMediaLinks: updated });
  };

  const addSocialMediaLink = () => {
    setRestaurantFormData({
      ...restaurantFormData,
      socialMediaLinks: [
        ...restaurantFormData.socialMediaLinks,
        { platform: "", url: "" },
      ],
    });
  };

  const removeSocialMediaLink = (index) => {
    setRestaurantFormData({
      ...restaurantFormData,
      socialMediaLinks: restaurantFormData.socialMediaLinks.filter(
        (_, i) => i !== index,
      ),
    });
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
              <div className="bg-(--color-base-100) rounded-lg p-3 h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-(--color-primary)">
                    Social Media Links
                  </label>

                  <button
                    type="button"
                    onClick={addSocialMediaLink}
                    className="text-xs bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded"
                  >
                    + Add Link
                  </button>
                </div>
                <div className="flex flex-col gap-2 h-27 overflow-y-auto">
                  {restaurantFormData.socialMediaLinks.map((link, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 gap-2 items-center"
                    >
                      <input
                        type="text"
                        placeholder="Platform (e.g. Instagram)"
                        value={link.platform}
                        onChange={(e) =>
                          handleSocialMediaChange(
                            index,
                            "platform",
                            e.target.value,
                          )
                        }
                        className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded text-sm`}
                        disabled={!editingRestaurant}
                      />
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) =>
                            handleSocialMediaChange(
                              index,
                              "url",
                              e.target.value,
                            )
                          }
                          className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded text-sm`}
                          disabled={!editingRestaurant}
                        />

                        <button
                          type="button"
                          onClick={() => removeSocialMediaLink(index)}
                          className="text-red-500 text-sm px-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                  {restaurantFormData.socialMediaLinks.length === 0 && (
                    <p className="text-xs text-(--color-secondary)">
                      No social media links added.
                    </p>
                  )}
                </div>
              </div>
            </div>
        </>
      )}
    </>
  );
};

export default RestaurantSocialMediaLinks;
