import { FormEvent, useCallback, useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdClear } from "react-icons/md";
import { AutoComplete, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import _ from "lodash";
import { UserOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs(),
    dayjs().add(1, "day"),
  ]);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      dates[0]?.toDate() || new Date(),
      dates[1]?.toDate() || new Date(),
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const clearForm = () => {
    setDestination("");
    setDates([dayjs(), dayjs().add(1, "day")]);
    setAdultCount(1);
    setChildCount(0);
  };

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = useCallback(
    _.debounce((query: string) => {
      axios
        .get(
          `https://api.locationiq.com/v1/autocomplete?key=pk.467d5cf9e0db6044acee6027d7f0cf13&q=${query}`
        )
        .then((response) => {
          setSuggestions(response.data.map((place: any) => place.display_name));
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500),
    []
  );

  useEffect(() => {
    if (destination) {
      fetchSuggestions(destination);
    } else {
      setSuggestions([]);
    }
  }, [destination, fetchSuggestions]);

  return (
    <form
      onSubmit={handleSubmit}
      className="py-6 -mt-10 p-3 bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-7 gap-1 items-center"
      style={{ position: "relative" }}
    >
      <AutoComplete
        options={suggestions.map((suggestion) => ({ value: suggestion }))}
        value={destination}
        onChange={setDestination}
        placeholder="Where are you going?"
        className="md:col-span-3 flex flex-row items-center custom-auto-complete mb-1 md:mb-0 font-bold"
        style={{ fontFamily: "Montserrat" }}
        allowClear
      />
      <div className="md:col-span-2">
        <RangePicker
          value={dates}
          onChange={(dates) => {
            if (
              dates &&
              dates[0] &&
              dates[1] &&
              dates[0].isSame(dates[1], "day")
            ) {
              setDates([dates[0], dates[0].add(1, "day")]);
              message.error(
                "Check-out date must be greater than check-in date.",
                2
              );
            } else {
              setDates(dates ? [dates[0], dates[1]] : [null, null]);
            }
          }}
          disabledDate={(current) =>
            current && current.isBefore(dayjs(), "day")
          }
          className="min-w-full bg-white p-[9px] focus:outline-none border border-solid border-zinc-500 rounded-[6px] font-bold"
          format="ddd, MMM DD"
          style={{ fontFamily: "Montserrat" }}
          allowClear={true}
        />
      </div>
      <div className="md:col-span-2 flex bg-white px-2 py-1 gap-2 border border-solid rounded-[6px] border-zinc-500 hover:border-blue-500 focus-within:border-blue-500">
        <UserOutlined className="self-center mr-2" />
        <div className="flex-grow flex justify-center">
          <label className="items-center flex font-medium">
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
          <label className="items-center flex font-medium">
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
      </div>
      <div className="col-span-full lg:col-start-6 lg:col-span-2 flex justify-end gap-1 mt-4">
        <button
          type="button"
          className="flex gap-1 items-center justify-center py-2 rounded px-4 bg-white md:text-base lg:text-lg font-medium sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-auto"
          onClick={() => {
            clearForm();
            message.success("Form has been cleared.", 2);
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
