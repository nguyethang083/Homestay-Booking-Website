import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { RatingBar } from "../components/RatingBar";
import { BsBuilding, BsDash, BsHouse, BsWifi } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Detail() {
  const renderIcon = (facility: string) => {
    switch (facility) {
      case "Free WiFi":
        return <BsWifi size={24} />;
      case "Outdoor Pool":
        return (
          <img
            src="https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/Pool_summer_swimming_water_watersport_-128.png"
            alt="outdoor_pool"
            className="h-[24px] w-[24px]"
          />
        );
      case "Parking":
        return (
          <img
            src="https://cdn2.iconfinder.com/data/icons/architecture-interior/24/architecture-interior-10-128.png"
            alt="parking"
            className="h-[24px] w-[24px]"
          />
        );
      case "Spa":
        return (
          <img
            src="https://cdn2.iconfinder.com/data/icons/skincare-solid/64/massage_skincare_facial_skin_woman_spa_self_care-128.png"
            alt="spa"
            className="h-[24px] w-[24px]"
          />
        );
      case "Airport Shuttle":
        return (
          <img
            src="https://cdn1.iconfinder.com/data/icons/hotel-city-and-travel-ui-next-2020/16/CITY_airport-shuttle-128.png"
            alt="airport_shuttle"
            className="h-[24px] w-[24px]"
          />
        );
      case "Fitness Center":
        return (
          <img
            src="https://cdn1.iconfinder.com/data/icons/delta-place/24/fitness-gym-barbell-weightlifting-workout-128.png"
            alt="makifitness_one"
            className="h-[24px] w-[24px]"
          />
        );
      case "Family Rooms":
        return <BsHouse size={24} />;
      case "Non-Smoking Rooms":
        return (
          <img
            src="https://cdn0.iconfinder.com/data/icons/real-estate-line-3-1/256/Non_Smoking_Area_512x512-128.png"
            alt="non-smoking"
            className="h-[24px] w-[24px]"
          />
        );
      default:
        return <BsDash size={24} />;
    }
  };

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
    <>
      <Helmet>
        <title>Hotel Booking</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <>
        <div className="flex items-center justify-center bg-white-A700 px-[21px] pt-[21px] shadow-xs sm:px-5 sm:pt-5" />
        <div className="flex flex-col items-center gap-[34px]">
          <div className="flex flex-col items-center self-stretch">
            <div className="mt-20 flex items-start justify-between gap-5 self-stretch p-[5px]">
              <h1 className="text-3xl font-bold mb-3">My Hotels</h1>
              <button className="flex bg-white items-center text-black px-6 font-semibold hover:bg-orange-500 hover:text-white border-2 border-mint rounded-xl">
                <Link to="/add-hotel">Add Hotel</Link>
              </button>
            </div>
            <div className="w-full bg-gray-50 ">
              {hotelData.map((hotel) => (
                <>
                  <div
                    data-testid="hotel-card"
                    className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
                  >
                    <div className="mx-auto mt-[33px] flex w-full max-w-[1232px] items-center justify-between gap-5 md:flex-col md:p-5 ">
                      <div className="flex w-[40%] flex-col gap-4 md:w-full">
                        <div className="flex items-start gap-4 sm:flex-col">
                          <div className="flex w-[12%] flex-col items-start justify-between md:flex-row md:items-center gap-3.5 md:w-full">
                            <p className="text-left !font-abel text-2xl font-normal md:text-[22px]">
                              {hotel.name}
                            </p>
                            <h2 className="text-right !text-red-A100 text-2xl font-normal md:text-[22px]">
                              <span className="text-[32px] text-red-A100">
                                ${hotel.pricePerNight}
                              </span>
                              <span className="text-sm text-red-A100">
                                /night
                              </span>
                            </h2>
                          </div>
                          <div className="mt-[5px] flex w-[33%] items-center gap-1 sm:w-full">
                            <RatingBar
                              value={hotel.starRating}
                              isEditable={false}
                              size={16}
                              className="flex justify-between"
                            />
                            <p className="text-xs font-medium">371 reviews</p>
                          </div>
                          <div className="flex w-[12%] flex-col items-start justify-between md:flex-row md:items-center gap-3.5 md:w-full">
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
                            <div className="flex justify-end">
                              <button className="flex bg-white items-center text-black px-6 font-semibold hover:bg-orange-500 hover:text-white border-2 border-mint rounded-xl">
                                <Link to={`/edit-hotel/${hotel._id}`}>
                                  {" "}
                                  Edit Details
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto mt-[70px] flex w-full max-w-[1232px] gap-2 md:flex-col md:p-5">
                      <div className="hotel-images">
                        {hotel.imageUrls.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mx-auto flex w-full max-w-[1232px] flex-col items-start gap-[45px] md:p-5">
                      <div className="h-px w-full self-stretch bg-gray-900_3f" />
                      <div className="flex flex-col items-start gap-[15px] self-stretch">
                        <p className="!font-abel text-2xl font-normal md:text-[22px]">
                          Overview
                        </p>
                        <p className="!text-gray-900_bf text-base">
                          {hotel.description}
                        </p>
                      </div>
                      <div className="flex w-[71%] gap-4 md:w-full md:flex-row">
                        <div className="flex-grow flex w-full flex-col items-start gap-8 rounded-[12px] bg-teal-200 p-[15px]">
                          <BsBuilding className="h-[32px] w-[32px]" />
                          <div className="flex flex-col items-start gap-0.5">
                            <h2 className="!font-bold">{hotel.type}</h2>
                          </div>
                        </div>
                        <div className="flex-grow flex w-full flex-col items-start gap-[62px] rounded-[12px] border border-solid border-teal-200 p-3.5 sm:gap-[31px]">
                          <img
                            src="https://cdn3.iconfinder.com/data/icons/hotel-service-gray-set-1/100/Untitled-1-02-128.png"
                            alt="room_service"
                            className="h-[32px] w-[32px]"
                          />
                          <p className="text-base font-medium">Room service</p>
                        </div>
                        <div className="flex-grow flex w-full flex-col items-start gap-[62px] rounded-[12px] border border-solid border-teal-200 p-3.5 sm:gap-[31px]">
                          <img
                            src="https://cdn3.iconfinder.com/data/icons/remixicon-map/24/restaurant-fill-128.png"
                            alt="restaurant_one"
                            className="h-[32px] w-[32px]"
                          />
                          <p className="text-base font-medium">Restaurant</p>
                        </div>
                        <div className="flex-grow flex w-full flex-col items-start gap-[61px] rounded-[12px] border border-solid border-teal-200 p-[15px] sm:gap-[30px]">
                          <img
                            src="https://cdn1.iconfinder.com/data/icons/rcons-basic-work-and-office/16/kitchen_restaurant_coffee_food_drink_tea_cup-128.png"
                            alt="breakfast_one"
                            className="h-[32px] w-[32px]"
                          />
                          <p className="text-base font-medium">
                            Tea/coffe machine
                          </p>
                        </div>
                        <div className="flex-grow flex w-full flex-col items-start gap-[61px] rounded-[12px] border border-solid border-teal-200 p-[15px] sm:gap-[30px]">
                          <img
                            src="https://cdn2.iconfinder.com/data/icons/keep-clean/405/star_clean_blink_wink_flare-128.png"
                            alt="bookmark_one"
                            className="h-[32px] w-[32px]"
                          />
                          <p className="text-base font-medium">Clean Hotel</p>
                        </div>
                      </div>

                      <div className="flex w-[58%] flex-col items-start gap-[30px] md:w-full">
                        <p className="!font-mitr text-xl font-normal">
                          Facilities
                        </p>
                        <div className="mb-[21px] flex flex-col gap-[10px] self-stretch md:flex-col sm:flex-col">
                          {hotel.facilities.map((facility, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              {renderIcon(facility)}{" "}
                              <p className="text-base font-medium">
                                {facility}
                              </p>
                            </div>
                          ))}
                          {hotel.facilities.length > 7 && (
                            <h3 className="!text-red-A100">
                              +{hotel.facilities.length - 7} more
                            </h3>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </>
    </>
  );
}
