import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { AiFillStar } from "react-icons/ai";

type Props = {
  selectedStars: string[];
  onChange: (value: string) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <div className="border-b border-slate-300 pb-5 space-y-1">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label className="flex items-center space-x-2">
          <Checkbox
            className="custom-checkbox"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={handleChange}
          />
          <span className="flex">
            {Array.from({ length: Number(star) }).map((_, i) => (
              <AiFillStar className="fill-yellow-400" key={i} />
            ))}
          </span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
