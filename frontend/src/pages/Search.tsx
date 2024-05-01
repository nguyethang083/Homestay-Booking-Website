import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import { Select } from "antd";
import { Button } from "antd";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (value: string) => {
    setSelectedStars((prevStars) =>
      prevStars.includes(value)
        ? prevStars.filter((star) => star !== value)
        : [...prevStars, value]
    );
  };

  const handleHotelTypeChange = (value: string) => {
    setSelectedHotelTypes((prevHotelTypes) =>
      prevHotelTypes.includes(value)
        ? prevHotelTypes.filter((hotelType) => hotelType !== value)
        : [...prevHotelTypes, value]
    );
  };

  const handleFacilityChange = (value: string) => {
    setSelectedFacilities((prevFacilities) =>
      prevFacilities.includes(value)
        ? prevFacilities.filter((prevFacility) => prevFacility !== value)
        : [...prevFacilities, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedPrice(undefined);
    setSelectedStars([]);
    setSelectedHotelTypes([]);
    setSelectedFacilities([]);
  };

  const { Option } = Select;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <Button
            type="primary"
            className="bg-mint font-medium text-black w-full items-center"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>{" "}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Rooms found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <Select
            value={sortOption}
            onChange={(value) => setSortOption(value)}
            style={{ width: 230, fontFamily: "Montserrat" }}
            className="custom-select"
          >
            <Option value="">Sort By</Option>
            <Option value="starRating">Star Rating</Option>
            <Option value="pricePerNightAsc">
              Price Per Night (low to high)
            </Option>
            <Option value="pricePerNightDesc">
              Price Per Night (high to low)
            </Option>
          </Select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
