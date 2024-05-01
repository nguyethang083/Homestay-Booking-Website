import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="flex flex-col justify-between shadow-md rounded-lg p-8 gap-8">
      <div className="flex justify-between items-start">
        <div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
          <div className="flex items-center mt-1">
            <span className="bg-rose-400 text-white p-2 rounded-lg font-medium text-sm whitespace-nowrap mr-2">
              {hotel.type}
            </span>
            <span className="flex items-center">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
              <span className="ml-1 text-sm">
                {" "}
                {hotel.starRating} Star Room
              </span>
            </span>
          </div>
        </div>
        <span className="mt-1 font-bold text-xl text-rose-400">
          ${hotel.pricePerNight}
          <span className="text-sm">/night</span>
        </span>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-64 object-cover object-center rounded-2xl"
          />
        </div>
        <div className="flex-1 px-4">
          <p>
            {hotel.description.length > 300
              ? hotel.description.substring(0, 300) + " ..."
              : hotel.description}
          </p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-sky-400 p-2 text-white rounded-lg font-bold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <Link
            to={`/detail/${hotel._id}`}
            className="mb-[-5px] mt-2 rounded bg-mint text-black hover:text-white hover:bg-sky-500 w-full justify-center text-center items-center p-2 font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
