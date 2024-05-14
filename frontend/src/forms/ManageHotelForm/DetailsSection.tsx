import { Controller, useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";

const DetailsSection = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const loadCityOptions = debounce(async (inputValue: string) => {
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}&limit=10`,
        {
          headers: {
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            "X-RapidAPI-Key":
              "d63b4ac8d3mshf59af497b1a388cp1ba222jsnb808edc741cf",
          },
        }
      );
      return response.data.data.map((city: any) => ({
        value: city.name,
        label: city.name,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }, 500);

  const loadCountryOptions = debounce(async (inputValue: string) => {
    const response = await axios.get(
      `https://restcountries.com/v2/name/${inputValue}`
    );
    return response.data.map((country: any) => ({
      value: country.name,
      label: country.name,
    }));
  }, 500);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Room</h1>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-2 min-w-[200px]">
          Name
          <input
            type="text"
            className="border border-mint rounded w-full py-[5px] px-2 font-normal"
            {...register("name", { required: "This field is required" })}
          ></input>
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <Controller
            name="city"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                loadOptions={loadCityOptions}
                isClearable
                placeholder="Select a city"
                onChange={(value: { value: string; label: string } | null) => {
                  field.onChange(value ? value.value : "");
                }}
                onBlur={field.onBlur}
                value={
                  field.value
                    ? { value: field.value, label: field.value }
                    : null
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderColor: "#8DD3BB",
                    minHeight: "30px",
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }),
                  clearIndicator: (provided) => ({
                    ...provided,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    paddingTop: "1px",
                    paddingBottom: "1px",
                  }),
                }}
              />
            )}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <Controller
            name="country"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                loadOptions={loadCountryOptions}
                isClearable
                placeholder="Select a country"
                onChange={(value: { value: string; label: string } | null) => {
                  field.onChange(value ? value.value : "");
                }}
                onBlur={field.onBlur}
                value={
                  field.value
                    ? { value: field.value, label: field.value }
                    : null
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderColor: "#8DD3BB",
                    minHeight: "30px",
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }),
                  clearIndicator: (provided) => ({
                    ...provided,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    paddingTop: "1px",
                    paddingBottom: "1px",
                  }),
                }}
              />
            )}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border border-mint rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Price Per Night
          <input
            type="number"
            min={1}
            className="border border-mint rounded w-full py-1 px-1 font-normal h-9"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          ></input>
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Star Rating
          <select
            {...register("starRating", {
              required: "This field is required",
            })}
            className="border border-mint rounded w-full p-2 text-gray-700 font-normal h-9"
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option value={num} className="">
                {num}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
