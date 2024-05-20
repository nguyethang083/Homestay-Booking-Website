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
    <div className="flex flex-col p-4 shadow-neutral-300 shadow-xl border rounded-xl gap-4">
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none border rounded border-mint"
              wrapperClassName="min-w-full"
              disabled
            />
          </div>
          <div>
            <DatePicker
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
              className="min-w-full bg-white p-2 focus:outline-none border rounded border-mint"
              wrapperClassName="min-w-full"
              disabled
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2 border rounded border-mint">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold bg-white"
                type="number"
                min={1}
                max={20}
                disabled
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold bg-white"
                type="number"
                min={0}
                max={20}
                disabled
                {...register("childCount", {
                  valueAsNumber: true,
                })}
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
