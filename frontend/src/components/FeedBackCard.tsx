import avatar from "../assets/images/avatar.png";
import quotationMark from "../assets/images/quotationMark.png";

const FeedbackCard = () => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md my-8 mx-2">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img src={avatar} />
          <div>
            <h1 className="font-bold">Jenny Wilson</h1>
            <p className="text-sm text-[#6D737A]">UI-UX Designer</p>
          </div>
        </div>
        <img className="h-5" src={quotationMark} />
      </div>

      <div className="py-8">
        <h3 className="text-base">
          The website's speed and performance are excellent, with pages loading
          quickly and no significant delays during the booking process. While
          the booking process itself was straightforward, a progress indicator
          would enhance the user experience. I appreciated the timely
          confirmation emails but suggest including a summary of booking details
          for quick reference. The reviews and ratings were helpful, although
          adding more verified reviews would provide a broader perspective.
        </h3>
      </div>
    </div>
  );
};

export default FeedbackCard;
