import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";

const GuestBookings = () => {
  const { hotelId } = useParams();

  const { data: bookings } = useQuery(
    ["fetchBookingsByHotel", hotelId],
    () => (hotelId ? apiClient.fetchBookingsByHotel(hotelId) : undefined),
    {
      enabled: !!hotelId,
    }
  );

  if (!bookings || bookings.length === 0) {
    return <span>No bookings found for this hotel</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Guest Bookings</h1>
      {bookings.map((booking) => (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-4">
          <div className="flex mb-2">
            <span className="font-bold mr-2">Booked by: </span>
            {booking.firstName} {booking.lastName}
          </div>
          <div className="mb-2">
            <span className="font-bold mr-2">Email: </span>
            <span>{booking.email}</span>
          </div>
          <div className="mb-2">
            <span className="font-bold mr-2">Dates: </span>
            <span>
              From{" "}
              {new Date(booking.checkIn).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              to{" "}
              {new Date(booking.checkOut).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-bold mr-2">Guests:</span>
            <span>
              {booking.adultCount} {booking.adultCount > 1 ? "adults" : "adult"}{" "}
              and {booking.childCount}{" "}
              {booking.childCount > 1 ? "children" : "child"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuestBookings;
