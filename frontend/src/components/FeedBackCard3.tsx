import quotationMark from "../assets/images/quotationMark.png";

const FeedbackCard3 = () => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md my-8 mx-2 h-[400px]">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img
            src="https://tse4.explicit.bing.net/th?id=OIP.hHbifnksuYXwHH_RrwSEkgHaFj&pid=Api&P=0&h=180"
            className="w-[70px] h-[71px] rounded-full"
          />
          <div>
            <h1 className="font-bold">Mark Robinson</h1>
            <p className="text-sm text-[#6D737A]">Software Engineer</p>
          </div>
        </div>
        <img className="h-5" src={quotationMark} />
      </div>

      <div className="py-8">
        <h3 className="text-base">
          The interface is user-friendly and easy to navigate. The search
          functionality is robust, allowing me to quickly find the information I
          needed. However, integrating a live chat support feature would greatly
          improve the overall experience. The design is clean and modern, which
          I find very appealing. Additionally, the mobile version works
          seamlessly, making it convenient to use on the go.
        </h3>
      </div>
    </div>
  );
};

export default FeedbackCard3;
