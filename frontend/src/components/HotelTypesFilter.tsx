import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { hotelTypes } from "../config/hotel-options-config";
import { Checkbox, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

type Props = {
  selectedHotelTypes: string[];
  onChange: (value: string) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const handleChange = (e: CheckboxChangeEvent) => {
    onChange(e.target.value);
  };

  const displayHotelTypes = showAll ? hotelTypes : hotelTypes.slice(0, 5);

  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {displayHotelTypes.map((hotelType) => (
        <label className="flex items-center space-x-2 text-sm" key={hotelType}>
          <Checkbox
            className="custom-checkbox"
            value={hotelType}
            checked={selectedHotelTypes.includes(hotelType)}
            onChange={handleChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
      <Button
        className="text-sky-500 font-bold flex items-center justify-center px-0"
        type="link"
        onClick={() => setShowAll(!showAll)}
        style={{ fontFamily: "Montserrat" }}
      >
        {showAll ? <MinusOutlined /> : <PlusOutlined />}
        {showAll ? "Show less" : "Show more"}
      </Button>
    </div>
  );
};

export default HotelTypesFilter;
