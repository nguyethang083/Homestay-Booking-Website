import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as apiClient from "../../api-client";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CloseCircleOutlined } from "@ant-design/icons";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  const [roomAvailability, setRoomAvailability] = useState<string | null>(null);
  const [showBookNow, setShowBookNow] = useState<boolean>(false);
  const [hasCheckedAvailability, setHasCheckedAvailability] =
    useState<boolean>(false);

  useEffect(() => {
    if (checkIn && checkOut) {
      apiClient
        .checkRoomAvailability(
          hotelId,
          checkIn.toISOString(),
          checkOut.toISOString()
        )
        .then((availability) => {
          if (availability.isAvailable) {
            setRoomAvailability("available");
          } else {
            setRoomAvailability("unavailable");
          }
        })
        .catch((error) => console.error(error));
    }
  }, [checkIn, checkOut, hotelId]);

  const checkAvailability = (event: React.MouseEvent) => {
    event.preventDefault();
    if (checkIn && checkOut) {
      apiClient
        .checkRoomAvailability(
          hotelId,
          checkIn.toISOString(),
          checkOut.toISOString()
        )
        .then((availability) => {
          if (availability.isAvailable) {
            setRoomAvailability("available");
            setShowBookNow(true);
          } else {
            setRoomAvailability("unavailable");
            setShowBookNow(false);
          }
          setHasCheckedAvailability(true);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    // <div className="flex flex-col p-4 guessInfo gap-4 border border-slate-300 rounded-lg">
    <div className="flex w-[90%] flex-col justify-between items-start md:flex-col md:items-center gap-10 md:w-full">
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          {/* <div className="flex flex-row gap-[10px] md:flex-row sm:flex-row"> */}
          <div className="flex w-[90%] flex-col justify-between items-start md:flex-row md:items-center gap-10 md:w-full">
            <div className="w-[400px] h-[100px] gap-[15px]">
              <div className="flex gap-[30px]">
                <span className="mr-15 text-base font-medium">Check-in</span>
                <DatePicker
                  disabled
                  required
                  selected={checkIn}
                  onChange={(date) => setValue("checkIn", date as Date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={minDate}
                  maxDate={maxDate}
                  placeholderText="Check-in Date"
                  className="min-w-full bg-white p-2 focus:outline-none border border-slate-300 rounded-lg"
                  wrapperClassName="min-w-full"
                />
              </div>

              <div className="flex gap-[30px]">
                <span className="mr-15 text-base font-medium">Check-out</span>
                <DatePicker
                  disabled
                  required
                  selected={checkOut}
                  onChange={(date) => setValue("checkOut", date as Date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={
                    new Date(new Date(checkIn).setDate(checkIn.getDate() + 1))
                  } // set minDate to checkIn + 1 day
                  maxDate={maxDate}
                  placeholderText="Check-out Date"
                  className="min-w-full bg-white p-2 focus:outline-none border border-slate-300 rounded-lg"
                  wrapperClassName="min-w-full"
                />
              </div>
            </div>
          </div>

          {/* <div className="flex bg-white px-2 py-1 gap-2"> */}
          {/* <div className="flex w-[23%] mt-[47px] items-center justify-between gap-5 sm:w-500 md:w-full sm:flex-row"> */}
          <div className="flex w-[90%] flex-col justify-between items-start md:flex-row md:items-center gap-10">
            <label className="items-center flex border border-slate-300 rounded-lg mr-1">
              Adults:
              <input
                className="flex w-full p-1 focus:outline-none font-bold items-center"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
                disabled
              />
            </label>
            <label className="items-center flex border border-slate-300 rounded-lg">
              Children:
              <input
                className=" flex w-full p-1 focus:outline-none font-bold items-center"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
                disabled
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <>
              {showBookNow ? (
                <button className="mb-[-5px] mt-2 rounded bg-mint text-black hover:text-white hover:bg-sky-500 w-full justify-center text-center items-center p-2 font-medium">
                  Book Now
                </button>
              ) : (
                <button
                  onClick={checkAvailability}
                  className="mb-[-5px] mt-2 rounded bg-mint text-black hover:text-white hover:bg-sky-500 w-full justify-center text-center items-center p-2 font-medium"
                >
                  Check Availability
                </button>
              )}
              {hasCheckedAvailability && (
                <p
                  className={`${
                    roomAvailability === "unavailable"
                      ? "text-red-500"
                      : "text-blue-600"
                  } font-bold`}
                >
                  {roomAvailability === "unavailable" ? (
                    <span className="flex items-center">
                      <CloseCircleOutlined className="mr-2" />
                      <span>This room is not available for your dates</span>
                    </span>
                  ) : (
                    <>
                      <CheckCircleOutlined className="mr-2" />
                      {`This room is ${roomAvailability} from ${checkIn.toLocaleDateString()} to ${checkOut.toLocaleDateString()}`}
                    </>
                  )}
                </p>
              )}
            </>
          ) : (
            <button className="bg-rose-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
