import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { hotelFacilities } from "../config/hotel-options-config";
import { Checkbox, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

type Props = {
  selectedFacilities: string[];
  onChange: (value: string) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const handleChange = (e: CheckboxChangeEvent) => {
    onChange(e.target.value);
  };

  const displayFacilities = showAll
    ? hotelFacilities
    : hotelFacilities.slice(0, 5);

  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {displayFacilities.map((facility) => (
        <label className="flex items-center space-x-2 text-sm" key={facility}>
          <Checkbox
            className="custom-checkbox"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={handleChange}
          />
          <span>{facility}</span>
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

export default FacilitiesFilter;
