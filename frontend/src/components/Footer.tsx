import * as React from "react";

interface LinkGroupProps {
  title: string;
  links: string[];
}

const LinkGroup: React.FC<LinkGroupProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="text-base font-bold font-trade-gothic">{title}</div>
      <div className="flex flex-col mt-4 text-sm font-medium opacity-60">
        {links.map((link, index) => (
          <div key={index} className={index > 0 ? "mt-3" : ""}>
            {link}
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const linkGroups = [
    {
      title: "Our Destinations",
      links: ["Canada", "Alaksa", "France", "Iceland"],
    },
    {
      title: "Our Activities",
      links: [
        "Northern Lights",
        "Cruising & sailing",
        "Multi-activities",
        "Kayaing",
      ],
    },
    {
      title: "Travel Blogs",
      links: [
        "Bali Travel Guide",
        "Sri Lanks Travel Guide",
        "Peru Travel Guide",
        "Bali Travel Guide",
      ],
    },
    {
      title: "About Us",
      links: ["Our Story", "Work with us"],
    },
    {
      title: "Contact Us",
      links: ["Our Story", "Work with us"],
    },
  ];

  return (
    <footer className="flex flex-col justify-between items-center px-16 py-8 bg-mint max-md:px-5">
      <div className="flex gap-5 py-5 w-full max-w-[1232px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col self-start ml-0.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5426cd3ceb97eaa72d62c42b6557c9cc79d2472999ace58c3947c06d549e7917?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
            alt="Company Logo"
            className="self-center aspect-[3.03] w-[120px]"
          />
          <div className="flex gap-3 px-0.5 mt-6">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/eabed5c44f5bcd3b4cc2f192ca1573475ce8a50bb60152a4744285dd0654fdb1?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
              alt=""
              className="shrink-0 w-5 aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb5b9d3faf3dbea02697a7e557264863ce9c081f938ead7deb56593ea0ccd159?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
              alt=""
              className="shrink-0 w-5 aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/28a73c0550ce3652bc02c4f20b02b740d901ca50961e71aef9b995f4f821b5b0?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
              alt=""
              className="shrink-0 w-5 aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/695cf63101bd1924021af4242ac330fd861454546d1f5b3d253088090952c561?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
              alt=""
              className="shrink-0 w-5 aspect-square"
            />
          </div>
        </div>
        <nav className="flex flex-1 gap-10 ml-16 pl-[px] text-neutral-900 max-md:flex-wrap">
          {linkGroups.map((group, index) => (
            <LinkGroup key={index} title={group.title} links={group.links} />
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
