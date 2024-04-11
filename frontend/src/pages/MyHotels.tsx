import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding } from "react-icons/bs";
import { BiHotel, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <button className="flex bg-white items-center text-black px-6 font-semibold hover:bg-orange-500 hover:text-white border-2 border-mint rounded-xl">
          <Link to="/add-hotel">Add Hotel</Link>
        </button>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="flex items-center">
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/zoldo-miscellaneous-003/64/address_location_pin-128.png"
                    alt="location_one"
                    className="h-[18px] w-[18px] mr-2"
                  />
                  <p className="text-left !text-gray-900_bf">
                    {hotel.city} ,{hotel.country}
                  </p>
                </div>
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-2" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                {/* <BiMoney className="mr-1" />${hotel.pricePerNight} per night */}
                <div className="flex items-center">
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/glypho-money-and-finance/64/money-dollar-circle-128.png"
                    alt="location_one"
                    className="h-[18px] w-[18px] mr-2"
                  />
                  <p className="text-left !text-gray-900_bf">
                    ${hotel.pricePerNight} per night
                  </p>
                </div>
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-2" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-2" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <div className="flex justify-end">
              <button className="flex bg-white items-center text-black px-6 font-semibold hover:bg-orange-500 hover:text-white border-2 border-mint rounded-xl">
                <Link to={`/edit-hotel/${hotel._id}`}> Edit Details</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
