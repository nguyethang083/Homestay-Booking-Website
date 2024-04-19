import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdClear, MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(
    new Date(new Date(checkIn).setDate(checkIn.getDate() + 1))
  );
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const clearForm = () => {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date(new Date().setDate(new Date().getDate() + 1)));
    setAdultCount(1);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="py-6 -mt-8 p-3 bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-4"
      style={{ position: "relative" }}
    >
      <div className="flex flex-row items-center flex-2 bg-white p-2 rounded border border-solid border-zinc-500">
        <MdTravelExplore size={23} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="md:col-span-1 lg:col-span-1">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded border border-solid border-zinc-500"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="md:col-span-1 lg:col-span-1">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={new Date(new Date(checkIn).setDate(checkIn.getDate() + 1))} // set minDate to checkIn + 1 day
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded border border-solid border-zinc-500"
          wrapperClassName="min-w-full"
        />
      </div>{" "}
      <div className="md:col-span-1 lg:col-span-1 flex bg-white px-2 py-1 gap-2 rounded border border-solid border-zinc-500">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex ">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className="col-span-full lg:col-start-3 lg:col-span-2 flex justify-end gap-1 mt-2">
        <button
          type="button"
          className="flex gap-1 items-center justify-center py-2 rounded px-4 bg-white md:text-base lg:text-lg font-medium sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-auto"
          onClick={() => {
            clearForm();
            message.success("Form has been cleared.", 1);
          }}
        >
          <MdClear size={25} /> Clear
        </button>
        <button className="flex gap-1 items-center justify-center py-2 rounded px-4 bg-mint md:text-base lg:text-lg font-medium sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-auto">
          <img
            src={
              "https://cdn.builder.io/api/v1/image/assets/TEMP/54a1bf163f60acece4256e8c3665b415c13fdaa50819ef6cbe136e07665c9608?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
            }
            className="w-4 h-auto mr-1"
          />
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
