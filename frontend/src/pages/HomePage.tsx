import * as React from "react";

interface RecentSearchItemProps {
  imageSrc: string;
  title: string;
  placeCount: number;
}

const RecentSearchItem: React.FC<RecentSearchItemProps> = ({
  imageSrc,
  title,
  placeCount,
}) => (
  <div className="flex gap-4">
    <div className="flex justify-center items-center">
      <img
        loading="lazy"
        src={imageSrc}
        alt={title}
        className="aspect-square w-[90px]"
      />
    </div>
    <div className="flex flex-col my-auto text-neutral-900">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-2 text-xs">{placeCount} places</div>
    </div>
  </div>
);

interface TravelDestinationProps {
  imageSrc: string;
  title: string;
  description: string;
  price: number;
}

const TravelDestination: React.FC<TravelDestinationProps> = ({
  imageSrc,
  title,
  description,
  price,
}) => (
  <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
    <div className="flex flex-col grow justify-center max-md:mt-4">
      <div className="flex overflow-hidden relative flex-col px-6 pt-20 pb-6 w-full aspect-[0.7] max-md:px-5">
        <img
          loading="lazy"
          src={imageSrc}
          alt={title}
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col mt-52 max-md:mt-10">
          <div className="flex gap-0.5 text-white">
            <div className="flex flex-col">
              <div className="text-2xl font-semibold">{title}</div>
              <div className="text-sm">{description}</div>
            </div>
            <div className="self-start mt-4 text-2xl font-semibold">
              $ {price}
            </div>
          </div>
          <div className="flex flex-col justify-center mt-4 text-sm font-medium text-neutral-900">
            <div className="justify-center items-center px-4 py-2 bg-green-300 rounded max-md:px-5">
              Book a Hotel
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const recentSearches = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/673a7d3ce329e0d9b78729fabea43f0041aea99c6bcbee4b6af7a3e37ba8a0d3?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      title: "Istanbul, Turkey",
      placeCount: 325,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ffb33dc8fd931ce7fd84a1c2e794371380773ffc884cd9dd8cfb9797ba705dea?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      title: "Sydney, Australia",
      placeCount: 325,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb9b96197c9655b73d524d68c77b7d280cbbc044ddd8c183ee5175fcf30af8a7?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      title: "Baku, Azerbaijan",
      placeCount: 325,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/85950aae2cfcfd755575184773c05db7f579c9f2448614c043e7abe9acb168c0?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      title: "Malé, Maldives",
      placeCount: 325,
    },
  ];

  const travelDestinations = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/15d066e41d748cf96b74e65499238ff95c5f13d929b0c1b6df5d2495df25647e?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      title: "Melbourne",
      description: "An amazing journey",
      price: 700,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/7f0b3f28bb957dbc86a66febe9a36ad541cefef5a6bb5e2f8a7521daf486126c?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      title: "Paris",
      description: "A Paris Adventure",
      price: 600,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9e02c53562a050ae66452cb281a9b24fe456cdf25c5dcc0acaaf7791af083229?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      title: "London",
      description: "London eye adventure",
      price: 350,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c26047becc70029c62a59b53448c9d8633bc06f4059ffc320ba32ac74d78a234?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&",
      title: "Columbia",
      description: "Amazing streets",
      price: 700,
    },
  ];

  return (
    <div className="flex justify-center items-center px-16 max-md:px-5">
      <div className="flex flex-col w-full max-w-[1232px] max-md:max-w-full">
        <section className="flex flex-col max-md:max-w-full">
          <h2 className="text-3xl font-bold text-black max-md:max-w-full">
            Your recent searches
          </h2>
          <div className="flex gap-5 justify-between mt-8 w-full max-md:flex-wrap max-md:max-w-full">
            {recentSearches.map((search, index) => (
              <RecentSearchItem
                key={index}
                imageSrc={search.imageSrc}
                title={search.title}
                placeCount={search.placeCount}
              />
            ))}
          </div>
        </section>
        <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-wrap">
            <div className="flex flex-col flex-1 text-black max-md:max-w-full">
              <h2 className="text-3xl font-bold max-md:max-w-full">
                Fall into travel
                <br />
              </h2>
              <p className="mt-4 text-base max-md:max-w-full">
                Going somewhere to celebrate this season? Whether you're going
                home or somewhere to roam, we've got the travel tools to get you
                to your destination.
              </p>
            </div>
            <div className="flex flex-col justify-center my-auto text-sm font-medium text-neutral-900">
              <div className="justify-center px-4 py-2 rounded border border-green-300 border-solid">
                See All
              </div>
            </div>
          </div>
          <div className="mt-8 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              {travelDestinations.map((destination, index) => (
                <TravelDestination
                  key={index}
                  imageSrc={destination.imageSrc}
                  title={destination.title}
                  description={destination.description}
                  price={destination.price}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-wrap">
            <div className="flex flex-col flex-1 text-black max-md:max-w-full">
              <h2 className="text-3xl font-semibold max-md:max-w-full">
                Fall into travel
                <br />
              </h2>
              <p className="mt-4 text-base max-md:max-w-full">
                Going somewhere to celebrate this season? Whether you're going
                home or somewhere to roam, we've got the travel tools to get you
                to your destination.
              </p>
            </div>
            <div className="flex flex-col justify-center my-auto text-sm font-medium text-neutral-900">
              <div className="justify-center px-4 py-2 rounded border border-green-300 border-solid">
                See All
              </div>
            </div>
          </div>
          <div className="mt-6 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[46%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow px-6 py-6 w-full bg-green-300 rounded-3xl max-md:px-5 max-md:mt-6 max-md:max-w-full">
                  <div className="flex flex-col justify-center max-md:max-w-full">
                    <div className="justify-between max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[85%] max-md:ml-0 max-md:w-full">
                          <h3 className="text-4xl font-bold text-neutral-900 max-md:mt-10">
                            Backpacking Sri Lanka
                          </h3>
                        </div>
                        <div className="flex flex-col ml-5 w-[15%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col justify-center p-2 w-full whitespace-nowrap bg-white rounded-lg text-neutral-900 max-md:mt-10">
                            <div className="text-sm">From</div>
                            <div className="mt-1 text-xl font-semibold">
                              $700
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-6 text-sm text-neutral-900 max-md:max-w-full">
                      Traveling is a unique experience as it's the best way to
                      unplug from the pushes and pulls of daily life. It helps
                      us to forget about our problems, frustrations, and fears
                      at home. During our journey, we experience life in
                      different ways. We explore new places, cultures, cuisines,
                      traditions, and ways of living.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center mt-32 text-sm font-medium text-neutral-900 max-md:mt-10 max-md:max-w-full">
                    <div className="justify-center items-center px-4 py-2 bg-white rounded max-md:px-5 max-md:max-w-full">
                      Book Flight
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[54%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
                  <div className="max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec2d83019341d3d6e6fb3a329353b6eb7152175e609e6c6a8e00fb362641a443?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
                          alt="Sri Lanka travel"
                          className="grow w-full border-2 border-green-300 border-solid aspect-[1.59] max-md:mt-5"
                        />
                      </div>
                      <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/adb82a1a4f6c702ead4160de36908a29d3f0f87280e803a8ce2d0c99eecbdd53?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
                          alt="Sri Lanka travel"
                          className="grow w-full border-2 border-green-300 border-solid aspect-[1.59] max-md:mt-5"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a81832e8d6a2ce99f48fea9f8eb34877ef8c53ddc3cf55e14da9462544da8d5?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
                          alt="Sri Lanka travel"
                          className="grow w-full border-2 border-green-300 border-solid aspect-[1.59] max-md:mt-5"
                        />
                      </div>
                      <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f045e8576629b8d3c3cd582c3bedb0540430731d8a4a95517fccd63a65f72c21?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
                          alt="Sri Lanka travel"
                          className="grow w-full border-2 border-green-300 border-solid aspect-[1.59] max-md:mt-5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
