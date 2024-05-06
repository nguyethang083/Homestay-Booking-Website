import { useParams } from "react-router-dom";
import { RatingBar } from "../components/RatingBar";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";

export default function BookingDetailPage() {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }
  if (!hotel) {
    return <span>No Rooms found</span>;
  }
  if (!currentUser) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <div className="flex w-full flex-col items-center bg-gray-50">
        <div className="flex w-[89%] flex-col gap-16 md:w-full md:p-5 sm:gap-8">
          {hotel.bookings
            .filter((booking) => booking.userId === currentUser._id)
            .map((booking) => (
              <div key={booking._id}>
                <div className="grid md:grid-cols-[2fr_1fr] gap-x-4">
                  <div className="flex items-center gap-10 md:flex-col bg-white border border-slate-300 rounded-lg p-8">
                    {/* <div className="grid md:grid-cols-[1fr_2fr] gap-x-4"> */}
                    <div className="flex flex-1 flex-col items-center rounded-[12px] bg-white-A700 px-6 pb-[38px] pt-[31px] shadow-xs md:self-stretch sm:p-5">
                      {/* <div className="grid md:grid-cols-[1fr_2fr] gap-x-4"> */}
                      <div className="flex items-center justify-between gap-5 self-stretch sm:flex-col">
                        <div className="flex w-[12%] flex-col items-start justify-between md:flex-row md:items-center gap-3.5 md:w-full">
                          <div className="flex">
                            <p className="!font-abel text-2xl font-normal md:text-[22px]">
                              Superior room - 1 double bed or 2 twin beds
                            </p>
                          </div>
                          <h1 className="mt-1 font-bold text-xl text-rose-400 !text-red-A100 text-[44px] md:text-[40px] sm:text-[34px]">
                            <span className="text-red-A100">
                              ${hotel.pricePerNight}
                            </span>
                            <span className="text-sm text-red-A100">
                              /night
                            </span>
                          </h1>
                        </div>
                      </div>
                      <div className="mt-[23px] flex flex-col gap-10 self-stretch">
                        <div className="flex flex-col items-start gap-[5px] rounded-lg border border-solid border-teal-200 bg-white-A700 px-8 pb-4 pt-[17px] sm:px-5">
                          <h2 className="text-2xl font-bold md:text-[22px]">
                            {/* CVK Park Bosphorus Hotel Istanbul */}
                            {hotel.name}
                          </h2>
                          <div className="flex items-center">
                            <img
                              src="https://cdn4.iconfinder.com/data/icons/zoldo-miscellaneous-003/64/address_location_pin-128.png"
                              alt="location_one"
                              className="h-[18px] w-[18px] mr-2"
                            />
                            <p className="self-end !text-gray-900_bf">
                              {/* Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437 */}
                              {hotel.city}, {hotel.country}
                            </p>
                          </div>
                        </div>
                        {/* <div className="flex items-center justify-between gap-5 sm:flex-col"> */}
                        <div className="flex w-[90%] flex-col justify-between items-start md:flex-row md:items-center gap-10 md:w-full">
                          <div className="flex flex-col items-start gap-1.5">
                            <div className="flex">
                              <h3 className="text-xl font-medium">
                                {/*Thursday, Dec 8*/}
                                {new Date(booking.checkIn).toDateString()}
                              </h3>
                            </div>
                            <p className="!text-gray-900_99">Check-In</p>
                          </div>
                          <div className="flex w-[23%] items-center justify-between gap-2 sm:w-500">
                            {/* <div className="flex w-[10%] flex-col items-start justify-between md:flex-row md:items-center gap-2 md:w-full"> */}
                            <img
                              src="https://cdn3.iconfinder.com/data/icons/user-interface-169/32/arrow-left-512.png"
                              alt="left image"
                              className="h-[48px] w-[48px] mr-1"
                            />
                            <img
                              src="https://cdn4.iconfinder.com/data/icons/maps-navigation-24/24/commute_home_office_city_neighborhood_house_building-128.png"
                              alt="center image"
                              className="h-[48px] w-[48px] mr-1"
                            />
                            <img
                              src="https://cdn3.iconfinder.com/data/icons/user-interface-169/32/arrow-right-128.png"
                              alt="right image"
                              className="h-[48px] w-[48px]"
                            />
                          </div>
                          <div className="flex flex-col items-start gap-1.5">
                            <div className="flex">
                              <h4 className="text-xl font-medium">
                                {/*Friday, Dec 9*/}
                                {new Date(booking.checkOut).toDateString()}
                              </h4>
                            </div>
                            <p className="!text-gray-900_99">Check-Out</p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="mt-[47px] flex w-[75%] justify-between gap-5 self-start md:w-full sm:flex-col"> */}
                      <div className="flex w-[23%] mt-[47px] items-center justify-between gap-5 sm:w-500 md:w-full sm:flex-row">
                        <div className="flex items-center gap-2">
                          <img
                            src="https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/moon_dark_mode_night-2-128.png"
                            className="h-[30px] w-[30px] mr-1"
                          />
                          <div className="flex flex-col items-start">
                            <h5 className="!text-gray-900_99 text-xs font-medium">
                              Total length of stay
                            </h5>
                            <p className="text-base font-medium">
                              {Math.ceil(
                                (new Date(booking.checkOut).getTime() -
                                  new Date(booking.checkIn).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              nights
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src="https://cdn4.iconfinder.com/data/icons/hotel-service-5/300/guest-128.png"
                            className="h-[30px] w-[30px] mr-1"
                          />
                          <div className="flex flex-col items-start">
                            <h5 className="!text-gray-900_99 text-xs font-medium">
                              Guests
                            </h5>
                            <p className="text-base font-medium">
                              {booking.adultCount} adults & {booking.childCount}{" "}
                              children
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src="https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami19-56-128.png"
                            className="h-[30px] w-[30px] mr-1"
                          />
                          <div className="flex flex-col items-start">
                            <h5 className="!text-gray-900_99 text-xs font-medium">
                              Room no.
                            </h5>
                            <p className="text-base font-medium">On arival</p>
                          </div>
                        </div>
                      </div>
                      <h6 className="mt-[47px] font-bold text-rose-400 !text-red-A100 text-2xl md:text-[22px]">
                        YOU HAVE PAID FOR THIS BOOKING
                      </h6>
                    </div>
                  </div>

                  {/* booking protection section */}
                  <div className="flex bg-white w-[36%] flex-col items-start gap-[15px] rounded-[12px] bg-white-A700 px-[23px] pb-[23px] pt-6 shadow-xs md:w-full sm:p-5 border border-slate-300 p-8">
                    <div className="flex items-start gap-3 self-stretch sm:flex-row">
                      <img
                        src={hotel.imageUrls[0]}
                        className="w-[130px] h-[130px] object-cover object-center rounded-[20px]"
                      />
                      <div className="flex flex-1 flex-col gap-[15px] sm:self-stretch">
                        <h4 className="leading-[29px] text-2xl font-bold md:text-[22px]">
                          {/* CVK Park Bosphorus Hotel Istanbul */}
                          {hotel.name}
                        </h4>
                        <div className="flex w-[60%] items-center gap-1 md:w-full">
                          <RatingBar
                            value={hotel.starRating}
                            isEditable={false}
                            size={20}
                            activeColor="#FFEE58"
                            className="flex justify-between"
                          />
                          <p className="text-xs font-medium">
                            {hotel.starRating} Star Hotel
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-px self-stretch bg-gray-900_3f" />

                    <div className="border-b py-2">
                      <p className="text-base font-medium">
                        <span className="text-gray-900">
                          Your booking is protected by&nbsp;
                        </span>
                        <span className="font-bold text-gray-900">OHB</span>
                      </p>
                    </div>
                    <div className="h-px self-stretch bg-gray-900_3f" />
                    <div className="flex flex-col gap-[15px] self-stretch">
                      <div className="flex flex-col items-start gap-[15px]">
                        <p className="!font-abel !font-normal text-base">
                          Price Details
                        </p>
                        <div className="flex flex-wrap justify-between gap-5 self-stretch">
                          <p className="text-base font-medium">Base Fare </p>
                          <h6>${booking.totalCost}</h6>
                        </div>
                        <div className="flex flex-wrap justify-between gap-5 self-stretch">
                          <p className="text-base font-medium">Discount</p>
                          <h6 className="h-[20px] w-[21px]">$0</h6>
                        </div>
                        <div className="flex flex-wrap justify-between gap-5 self-stretch">
                          <p className="text-base font-medium">Taxes</p>
                          <h6>$0</h6>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-5 self-stretch">
                          <p className="text-base font-medium">Service Fee</p>
                          <h6>$0</h6>
                        </div>
                      </div>
                      <div className="h-px bg-gray-900_3f border-b py-2" />
                      <div className="flex flex-wrap items-center justify-between gap-5">
                        <p className="text-base font-medium">Total </p>
                        <h6>${booking.totalCost}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* terms and conditions section */}
          <div className="flex flex-col items-start gap-[33px]">
            <a href="#">
              <h2 className="text-2xl font-bold md:text-[25px]">
                Terms and Conditions
              </h2>
            </a>
            <div className="flex w-[97%] flex-col gap-[15px] md:w-full">
              <div className="flex self-start">
                <p className="text-xl font-medium">Payments</p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="!font-normal leading-5">
                  If you are purchasing your ticket using a debit or credit card
                  via the Website, we will process these payments via the
                  automated secure common payment gateway which will be subject
                  to fraud screening purposes.{" "}
                </p>
                <p className="!font-normal leading-5">
                  If you do not supply the correct card billing address and/or
                  cardholder information, your booking will not be confirmed and
                  the overall cost may increase. We reserve the right to cancel
                  your booking if payment is declined for any reason or if you
                  have supplied incorrect card information. If we become aware
                  of, or is notified of, any fraud or illegal activity
                  associated with the payment for the booking, the booking will
                  be cancelled and you will be liable for all costs and expenses
                  arising from such cancellation, without prejudice to any
                  action that may be taken against us.
                </p>
                <p className="!font-normal leading-5">
                  Golobe may require the card holder to provide additional
                  payment verification upon request by either submitting an
                  online form or visiting the nearest Golobe office, or at the
                  airport at the time of check-in. Golobe reserves the right to
                  deny boarding or to collect a guarantee payment (in cash or
                  from another credit card) if the card originally used for the
                  purchase cannot be presented by the cardholder at check-in or
                  when collecting the tickets, or in the case the original
                  payment has been withheld or disputed by the card issuing
                  bank. Credit card details are held in a secured environment
                  and transferred through an internationally accepted system.
                </p>
              </div>
            </div>
            <div className="flex w-[97%] flex-col items-start gap-[15px] md:w-full">
              <a href="#">
                <p className="text-xl font-medium">Contact Us</p>
              </a>
              <p className="w-full !font-normal leading-5">
                <span className="text-gray-900">
                  <>
                    If you have any questions about our Website or our Terms of
                    Use, please contact:
                    <br />
                    OHB Group Q.C.S.C
                    <br />
                    UET Tower
                    <br />
                    P.O. Box: 22550
                    <br />
                    Xuan Thuy, Cau Giay
                    <br />
                    Further contact details can be found at&nbsp;
                  </>
                </span>
                <a href="#" className="text-gray-900 underline">
                  ohb
                </a>
                <a href="#" className="text-gray-900 underline">
                  <>
                    .com/help
                    <br />
                  </>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
