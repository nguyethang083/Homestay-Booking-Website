import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { RatingBar } from "../components/RatingBar";
import { BsDash, BsHouse, BsWifi } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import "../index.css";
import { useAppContext } from "../contexts/AppContext";

export default function Detail() {
  const { isHost, isLoggedIn } = useAppContext();
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

  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <span>No Rooms found</span>;
  }

  const images = hotel.imageUrls;

  return (
    <>
      <div className="flex flex-col items-center gap-[34px]">
        <div className="flex flex-col items-center self-stretch">
          <div className="w-full bg-[#f6f8fc] rounded-xl shadow-2xl">
            <div
              data-testid="hotel-card"
              className="flex flex-col justify-between p-8"
            >
              <div className="mx-auto mt-[8px] flex w-full max-w-[1232px] items-left justify-between gap-5 md:flex-col md:p-5 ">
                <div className="flex gap-2 text-base font-medium text-rose-400">
                  <div>{hotel.country}</div>
                  <IoIosArrowForward className="text-neutral-900 mt-[4px]" />
                  <div>{hotel.city}</div>
                  <IoIosArrowForward className="text-neutral-900 mt-[4px]" />
                  <div className="text-neutral-900">{hotel.name}</div>
                </div>
                <div className="flex w-[40%] flex-col gap-4 md:w-full">
                  <div className="flex items-start gap-4 sm:flex-col">
                    <div className="flex w-[12%] flex-col items-start justify-between md:flex-row md:items-center gap-3.5 md:w-full">
                      <div className="flex gap-4 max-md:flex-wrap">
                        <span className="bg-rose-400 text-white p-2 rounded-lg font-medium text-sm whitespace-nowrap mr-2">
                          {hotel.type}
                        </span>
                        <div className="flex items-left gap-1 my-auto text-xs font-medium">
                          <div className="flex">
                            <RatingBar
                              value={hotel.starRating}
                              isEditable={false}
                              size={20}
                              activeColor="#FFEE58"
                            />
                          </div>
                          <div>{hotel.starRating} Star Room</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-right text-rose-400">
                        <span className="text-3xl leading-10">
                          ${hotel.pricePerNight}
                        </span>
                        <span className="text-sm leading-4">/night</span>
                      </div>
                    </div>
                    <div className="flex w-[12%] flex-col items-start justify-between md:flex-row md:items-center gap-3.5 md:w-full">
                      <div className="flex items-center">
                        <img
                          src="https://cdn4.iconfinder.com/data/icons/zoldo-miscellaneous-003/64/address_location_pin-128.png"
                          alt="location_one"
                          className="h-[18px] w-[18px] mr-2"
                        />
                        <p className="text-left !text-gray-900_bf">
                          {hotel.city}, {hotel.country}
                        </p>
                      </div>
                      <div className="flex justify-end"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto flex w-full max-w-[1232px] gap-2 md:flex-col md:p-5">
                <div className="flex flex-wrap">
                  {images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="w-full md:w-1/2 lg:w-1/2 lg:mb-4 lg:pr-4"
                    >
                      <img
                        loading="lazy"
                        src={image}
                        className="w-full h-auto"
                        alt={`Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto flex w-full max-w-[1232px] flex-col items-start gap-[45px] md:p-5">
                {/* <div className="h-px w-full self-stretch bg-gray-900_3f" /> */}
                <div className="flex flex-col items-start gap-[15px] self-stretch">
                  <h2 className="!font-abel text-2xl font-normal md:text-[22px]">
                    <strong>Overview</strong>
                  </h2>
                  <div className="w-full">
                    <p className="long-text">{hotel.description}</p>
                  </div>
                </div>
                <div className="flex w-[58%] flex-row items-start gap-[30px] md:w-full">
                  <div className="flex-row gap-[50px]">
                    <h2 className="!font-mitr text-xl font-normal black mb-[15px]">
                      <strong>Facilities</strong>
                    </h2>
                    <div className="flex flex-row gap-[10px] md:flex-row sm:flex-row">
                      <div className="w-[400px] h-[100px] gap-[15px]">
                        {hotel.facilities.map((facility, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[10px] mb-[10px] w-[300px]"
                          >
                            {renderIcon(facility)}{" "}
                            <p className="text-base font-medium">{facility}</p>
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
                  <div className="w-full">
                    <div className="w-[600px] h-[250px]">
                      {(isLoggedIn === false || !isHost) && (
                        <GuestInfoForm
                          pricePerNight={hotel.pricePerNight}
                          hotelId={hotel._id}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
