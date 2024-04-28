import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { ArrowRightOutlined } from "@ant-design/icons";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-md shadow-lg p-2">
      <div className="h-[200px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded"
        />
      </div>

      <div className="mt-4 space-y-2">
        <span className="flex items-center text-sm tracking-tight">
          <IoLocationOutline className="text-red-500 text-base" />
          <span className="opacity-60 text-base font-medium ml-1">
            {hotel.country}
          </span>
        </span>
        <span className="block text-xl font-medium tracking-tight">
          {hotel.name}
        </span>
        <div className="flex items-center pb-2">
          <span className="opacity-60 text-sm font-medium mr-1">Rating: </span>
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </div>
        <div className="border-t border-gray-200 flex justify-between items-center pt-2">
          <div className="font-bold text-rose-400">
            <span className="text-lg leading-10">${hotel.pricePerNight}</span>
            <span className="text-sm leading-4"> / night</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-gray-400 text-sm font-medium flex items-center"
          >
            Explore More
            <ArrowRightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestDestinationCard;
