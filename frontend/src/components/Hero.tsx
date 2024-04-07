const Hero = () => {
  return (
    <section className="flex overflow-hidden relative flex-col justify-center items-center px-6 py-20 mt-2.5 w-full text-white min-h-[300px] max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3eeb2ecee0c8954732c9d500b324bb9904b66d36d9ae341e69b3111510c04f34?apiKey=b12a79cfb4a14ebcaeab8ea7e50ef795&"
        alt=""
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative flex-col mb-36 ml-28 max-md:mb-10 text-center">
        <h1 className="mt-12 text-5xl font-bold max-md:max-w-full max-md:text-4xl">
          Make your travel whishlist, we'll do the rest
        </h1>
        <p className="mt-4 text-2xl font-medium max-md:max-w-full">
          Special offers to suit your plan
        </p>
      </div>
    </section>
  );
};

export default Hero;
