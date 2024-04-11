import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaBed } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";

const MyHotel: React.FC = () => {
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
        <Link
          to="/add-hotel"
          className="flex bg-mint rounded text-black text-xl font-medium p-2 hover:bg-orange-500 hover:text-white"
        >
          Add Hotel
        </Link>
      </span>
      <div className="flex flex-col gap-8">
        {hotelData.map((hotel) => (
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
            <div className="grid grid-cols-2 lg:grid-cols-3 ml-5">
              {hotel.imageUrls.slice(0, 3).map((image) => (
                <div className="min-h-[200px] min-w-[290px]">
                  <img
                    src={image}
                    alt={hotel.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
            <hr className="mt-8 w-full bg-neutral-900 min-h-[1px] max-md:mt-10 max-md:max-w-full" />
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
              <div className="flex gap-5 max-md:flex-col max-md:gap-2">
                <div className="border border-green-300 rounded p-3 flex items-center bg-mint font-medium">
                  <FaHotel className="mr-1" />
                  {hotel.type}
                </div>
                <span className="border border-green-300 rounded p-3 flex items-center ">
                  <FaBed className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </span>
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-mint text-black text-xl font-medium p-2 hover:bg-orange-500 hover:text-white"
              >
                Edit Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotel;
