import * as React from "react";

interface DestinationInputProps {
  icon: string;
  label: string;
  value: string;
}

const DestinationInput: React.FC<DestinationInputProps> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex flex-col justify-center rounded w-full md:w-1/2 lg:w-1/3">
    <div className="flex flex-col justify-center w-full bg-white rounded border border-solid border-zinc-500">
      <div className="flex gap-0 py-1 pr-4 rounded">
        <div className="flex flex-col justify-center p-1">
          <div className="flex flex-col justify-center rounded-[100px]">
            <div className="flex justify-center items-center p-2">
              <img src={icon} alt="" className="w-6 aspect-square" />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center items-start pr-20 pb-2.5 my-auto text-zinc-900">
          <div className="justify-center text-sm bg-white">{label}</div>
          <div className="justify-center mt-2.5 text-base">{value}</div>
        </div>
      </div>
    </div>
  </div>
);

interface DateInputProps {
  label: string;
  value: string;
  icon: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, icon }) => (
  <div className="flex flex-col justify-center rounded w-full md:w-1/2 lg:w-1/3">
    <div className="flex flex-col justify-center w-full bg-white rounded border border-solid border-zinc-500">
      <div className="flex gap-0 py-1 pl-4 rounded">
        <div className="flex flex-col flex-1 justify-center pb-2.5 my-auto">
          <div className="justify-center text-sm bg-white text-neutral-900">
            {label}
          </div>
          <div className="justify-center mt-2.5 text-base text-zinc-900">
            {value}
          </div>
        </div>
        <div className="flex justify-center items-center p-3">
          <img src={icon} alt="" className="w-6 aspect-square" />
        </div>
      </div>
    </div>
  </div>
);

interface GuestsInputProps {
  icon: string;
  label: string;
  value: string;
  arrowIcon: string;
}

const GuestsInput: React.FC<GuestsInputProps> = ({
  icon,
  label,
  value,
  arrowIcon,
}) => (
  <div className="flex flex-col justify-center rounded w-full md:w-1/2 lg:w-1/3">
    <div className="flex flex-col justify-center w-full h-autobg-white rounded border border-solid border-zinc-500">
      <div className="flex gap-0 py-1 rounded">
        <div className="flex flex-col justify-center p-1">
          <div className="flex flex-col justify-center rounded-[100px]">
            <div className="flex justify-center items-center p-2">
              <img src={icon} alt="" className="w-6 aspect-square" />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center pb-2.5 my-auto text-zinc-900">
          <div className="justify-center text-sm">{label}</div>
          <div className="justify-center mt-2.5 text-base">{value}</div>
        </div>
        <div className="flex justify-center items-center p-3">
          <img src={arrowIcon} alt="" className="w-6 aspect-square" />
        </div>
      </div>
    </div>
  </div>
);

interface ActionProps {
  icon: string;
  label: string;
  className?: string;
}

const Action: React.FC<ActionProps> = ({ icon, label, className = "" }) => (
  <div className="flex flex-col justify-center ">
    <div className={`flex gap-1 justify-center py-2 rounded ${className}`}>
      <img
        src={icon}
        alt=""
        className="shrink-0 self-start w-4 aspect-square"
      />
      <div>{label}</div>
    </div>
  </div>
);

function SearchBar() {
  const destinationInputData = {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d31d1300ee5999b99bed53a98f31e50b947fbb664fd83fb9448e1adf8215cfbb?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
    label: "Enter Destination",
    value: "Istanbul, Turkey",
  };

  const dateInputsData = [
    {
      label: "Check In",
      value: "Fri 12/2",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d939e94994c7fa4afc60747e654e1b1c224f8b8155c92eb40719afa2e860637?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
    },
    {
      label: "Check Out",
      value: "Sun 12/4",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d939e94994c7fa4afc60747e654e1b1c224f8b8155c92eb40719afa2e860637?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
    },
  ];

  const guestsInputData = {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e97fdca654d48ed0d599f0b8084d6e57d66c163d17a016e9d3b24f3bedc3f841?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
    label: "Rooms & Guests",
    value: "1 room, 2 guests",
    arrowIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e1cf7c3f17008bea66f4d4017b6e7de5c5fd105cef9d09b5eb87da37baf792db?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
  };

  const actionsData = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fcc71c9333e1e93d37ec5e537a9ff799f13d327420f759b5ebb16134b3e31926?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      label: "Add Promo Code",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/54a1bf163f60acece4256e8c3665b415c13fdaa50819ef6cbe136e07665c9608?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      label: "Show Places",
      className: "px-4 bg-mint",
    },
  ];

  return (
    <div className="flex flex-col justify-center px-6 py-3 bg-slate-50 rounded-2xl shadow-sm max-md:px-5 w-full">
      <h1 className="text-xl font-semibold text-neutral-900 max-md:max-w-full">
        Where are you flying?{" "}
      </h1>
      <div className="flex gap-2 mt-8 max-md:flex-wrap">
        <DestinationInput {...destinationInputData} />
        {dateInputsData.map((inputData) => (
          <DateInput key={inputData.label} {...inputData} />
        ))}
        <GuestsInput {...guestsInputData} />
      </div>
      <div className="flex gap-5 pl-20 mt-8 text-sm font-medium text-neutral-900 max-md:flex-wrap max-md:pl-5 justify-end">
        {actionsData.map((actionData) => (
          <Action key={actionData.label} {...actionData} />
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
