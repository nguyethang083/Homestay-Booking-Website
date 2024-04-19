type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2"> Max Price</h4>
      <input
        type="range"
        min="1"
        max="1000"
        step="1"
        value={selectedPrice || ""}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      />
      <div className="text-rose-400 font-bold">
        {selectedPrice ? `$${selectedPrice}` : "Select Max Price"}
      </div>
    </div>
  );
};

export default PriceFilter;
