import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import Feedback from "../components/Feedback";

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const displayedHotels = hotels?.slice(0, 9) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold text-[#20B486]">Latest Destinations</h2>
      <p className="text-[#6D737A]">
        Most recent destinations added by our hosts
      </p>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {displayedHotels.map((hotel) => (
          <LatestDestinationCard hotel={hotel} />
        ))}
      </div>
      {hotels && hotels.length > 9 && (
        <div className="flex justify-center">
          <a
            href="/search"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-base font-medium flex items-center mt-2"
          >
            Explore More
            <ArrowRightOutlined className="ml-2" />
          </a>
        </div>
      )}
      <Feedback />
    </div>
  );
};

export default Home;
