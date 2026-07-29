import { MapPin, Circle, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AcceptRideUiCaptain = ({handlepopUp , handleConfirmPopUp , rideData , setOtp , confirmFunc}) => {
    const navigate = useNavigate()
    console.log(rideData)
  return (
    <div className="absolute bottom-0 left-0 w-full rounded-t-2xl bg-white px-5 pt-3 pb-6 h-screen">

      {/* Drag Handle */}
      <div className="w-9 h-1 rounded-full bg-gray-300 mx-auto mb-4" />

      {/* Heading */}
      <h2 className="text-[22px] font-medium text-gray-950 tracking-tight mb-4">
        Confirm this ride to start
      </h2>

      {/* Rider Card */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-1">

        <div className="flex items-center gap-3">

          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt=""
            className="w-11 h-11 rounded-full object-cover"
          />

          <span className="text-[15px] font-medium text-gray-950">
            {typeof rideData.user === "string"
              ? rideData.user
              : rideData.user?.userName?.firstName || rideData.user?.userName?.lastName || "Rider"}
          </span>

        </div>

      </div>

      {/* Route */}
      <div className="flex gap-3 py-2">

        <div className="flex flex-col items-center pt-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-950"></div>
          <div className="w-[2px] flex-1 min-h-[28px] bg-gray-300 my-1"></div>
          <div className="w-2.5 h-2.5 rounded-sm bg-gray-950"></div>
        </div>

        <div className="flex-1 min-w-0">

          {/* Pickup */}
          <div className="pb-4 border-b border-gray-100">
            <p className="font-medium text-[15px] text-gray-950 leading-tight truncate">
              {rideData.pickup}
            </p>
          </div>

          {/* Destination */}
          <div className="pt-4">
            <p className="font-medium text-[15px] text-gray-950 leading-tight truncate">
              {rideData.destination}
            </p>
          </div>

        </div>

      </div>

      {/* Payment */}
      <div className="flex items-center justify-between py-4 mt-1 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <Wallet size={18} className="text-gray-950" />
          <p className="text-[15px] text-gray-950">Cash</p>
        </div>
        <p className="font-medium text-[16px] text-gray-950">{rideData.fare}</p>
      </div>

      {/* Buttons */}
      <form className="w-full mt-1">
        <input
          type="text"
          onChange={(e) => {
            setOtp(e.target.value)
          }}
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-center text-lg font-medium tracking-[0.4em] text-gray-950 outline-none focus:ring-2 focus:ring-gray-950 focus:border-transparent transition"
        />
      </form>
      <div className="mt-3 space-y-2.5">

        <button 
        onClick={() => {
          confirmFunc()
        }}
        className="w-full rounded-xl bg-gray-950 py-4 text-white text-[16px] font-medium hover:bg-black active:scale-[0.98] transition">
          Confirm
        </button>


        <button
        onClick={() => {
            handleConfirmPopUp(false)
            handlepopUp(false)
        }}
        className="w-full rounded-xl bg-white border border-gray-300 py-4 text-gray-950 text-[16px] font-medium hover:bg-gray-50 active:scale-[0.98] transition">
          Cancel
        </button>

      </div>

    </div>
  );
};

export default AcceptRideUiCaptain;