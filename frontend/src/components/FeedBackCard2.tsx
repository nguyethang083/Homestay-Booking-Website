import quotationMark from "../assets/images/quotationMark.png";

const FeedbackCard2 = () => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md my-8 mx-2 h-[400px]">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.U14fTFTcYWeLnSvlnsmhiQHaHa&pid=Api&P=0&h=180"
            className="w-[70px] h-[71px] rounded-full"
          />
          <div>
            <h1 className="font-bold">Lisa Thompson</h1>
            <p className="text-sm text-[#6D737A]">Project Manager</p>
          </div>
        </div>
        <img className="h-5" src={quotationMark} />
      </div>

      <div className="py-8">
        <h3 className="text-base">
          Overall, the user experience was positive with a few minor hiccups.
          The customer service was responsive and helpful, which is a huge plus.
          I did encounter a minor issue with the payment gateway, but it was
          resolved promptly. Adding more detailed FAQs would be beneficial for
          first-time users. The visual design is attractive and professional,
          making it a pleasure to use the website.
        </h3>
      </div>
    </div>
  );
};

export default FeedbackCard2;
