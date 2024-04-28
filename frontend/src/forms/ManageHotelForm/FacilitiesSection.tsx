import { useFormContext, Controller } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
import { Checkbox } from "antd";

const FacilitiesSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <Controller
            name="facilities"
            control={control}
            defaultValue={[]}
            rules={{
              validate: (facilities) => {
                if (facilities && facilities.length > 0) {
                  return true;
                } else {
                  return "At least one facility is required";
                }
              },
            }}
            render={({ field }) => (
              <Checkbox
                value={facility}
                className="custom-checkbox text-sm flex text-gray-700 font-medium"
                checked={field.value.includes(facility)}
                onChange={(e) => {
                  if (e.target.checked) {
                    field.onChange([...field.value, facility]);
                  } else {
                    field.onChange(field.value.filter((f) => f !== facility));
                  }
                }}
              >
                {facility}
              </Checkbox>
            )}
          />
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
