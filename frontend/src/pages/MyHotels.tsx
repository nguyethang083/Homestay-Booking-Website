import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaBed } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { fetchMyHotels, removeMyHotelById } from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import { HotelType } from "../../../backend/src/shared/types";
import { Modal, Button } from "antd";

const MyHotel: React.FC = () => {
  const { showToast } = useAppContext();

  const [hotels, setHotels] = useState<HotelType[]>([]);

  const fetchHotels = async () => {
    try {
      const fetchedHotels = await fetchMyHotels();
      setHotels(fetchedHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hotelToRemove, setHotelToRemove] = useState<string | null>(null);
  const removeHotel = (id: string) => {
    setHotelToRemove(id);
    setIsModalOpen(true);
  };
  const confirmRemoveHotel = async () => {
    if (!hotelToRemove) return;

    // Remove the hotel from the backend and update the state
    try {
      await removeMyHotelById(hotelToRemove);
      setHotels(hotels.filter((hotel) => hotel._id !== hotelToRemove));
      showToast({ message: "Hotel removed successfully!", type: "SUCCESS" });
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Failed to remove hotel", error);
      showToast({ message: "Error removing hotel", type: "ERROR" });
    }

    // Close the modal and reset hotelToRemove
    setIsModalOpen(false);
    setHotelToRemove(null);
  };

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-mint rounded text-black text-xl font-medium p-2 transition-all transform duration-200 ease-in-out hover:bg-sky-500 hover:text-white hover:scale-110"
        >
          Add Hotel
        </Link>
      </span>
      <h1 className="text-xl font-bold">
        You're owning {hotels.length} hotels
      </h1>
      <div className="flex flex-col gap-8">
        {hotels.map((hotel) => (
          <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col self-start text-neutral-900 max-md:max-w-full">
                <div className="flex gap-4 px-5 max-md:flex-wrap">
                  <h1 className="text-2xl">{hotel.name}</h1>
                  <div className="flex items-center">
                    {[...Array(hotel.starRating)].map((_, i) => (
                      <FaStar key={i} className="mr-1" color="gold" />
                    ))}
                    <span className="ml-1">
                      {" "}
                      {hotel.starRating} Star Rating
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center mt-4 text-base font-medium max-md:max-w-full">
                  <div className="flex gap-0.5 px-5 max-md:flex-wrap">
                    <FaLocationDot className="max-md:max-w-full mt-1" />
                    {hotel.city + ", " + hotel.country}
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-5">
                <div className="text-2xl font-bold text-right text-rose-400">
                  <span className="text-3xl leading-10">
                    ${hotel.pricePerNight}
                  </span>
                  <span className="text-lg leading-4">/night</span>
                </div>
                <div className="flex flex-col justify-center mt-4 text-sm font-semibold text-neutral-900">
                  <div className="flex flex-col justify-center" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3">
              {hotel.imageUrls.slice(0, 3).map((image) => (
                <div className="min-h-[200px] min-w-[290px] ml-5">
                  <img
                    src={image}
                    alt={hotel.name}
                    className="w-full h-full object-cover object-center rounded"
                  />
                </div>
              ))}
            </div>
            <hr className="mt-5 w-11/12 bg-neutral-900 ml-5" />
            <section className="box-border flex relative flex-col shrink-0">
              <div className="flex flex-col px-5 w-full text-neutral-900 max-md:max-w-full">
                <h2 className="w-full text-xl max-md:max-w-full font-semibold">
                  Description
                </h2>
                <p className="mt-4 w-full text-base font-medium max-md:max-w-full">
                  {hotel.description}
                </p>
              </div>
            </section>
            <div className="px-5 mt-8 max-w-full w-[688px]">
              <div className="flex gap-3 max-md:flex-col max-md:gap-2">
                <div className="rounded p-3 flex items-center bg-rose-400 text-white font-semibold">
                  <FaHotel className="mr-1 " />
                  {hotel.type}
                </div>
                <span className="rounded p-3 flex items-center bg-sky-500 text-white">
                  <FaBed className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </span>
              </div>
            </div>
            <span className="flex justify-end text-lg mr-5">
              <button
                className="rounded mr-2 flex bg-white text-black font-medium p-2 transition-all transform duration-200 ease-in-out hover:bg-sky-500 hover:text-white hover:scale-110"
                onClick={() => removeHotel(hotel._id)}
              >
                Remove
              </button>
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="rounded mr-2 flex bg-mint text-black font-medium p-2 transition-all transform duration-200 ease-in-out hover:bg-sky-500 hover:text-white hover:scale-110"
              >
                Edit Details
              </Link>
              <Link
                to={`/hotels/${hotel._id}/bookings`}
                className="rounded flex bg-mint text-black font-medium p-2 transition-all transform duration-200 ease-in-out hover:bg-sky-500 hover:text-white hover:scale-110"
              >
                View Bookings
              </Link>
            </span>
          </div>
        ))}
      </div>
      <Modal
        title="Confirm Removal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        style={{ top: "30%" }}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            No, keep it
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={confirmRemoveHotel}
            className="text-black"
            style={{ borderColor: "#8DD3BB" }}
          >
            Yes, remove it
          </Button>,
        ]}
      >
        <p>Are you sure you want to remove this hotel?</p>
      </Modal>
    </div>
  );
};

export default MyHotel;
