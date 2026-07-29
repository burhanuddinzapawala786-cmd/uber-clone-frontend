import {
  MapPin,
  IndianRupee,
} from "lucide-react";

const RidePopup = ({handlepopUp , handleConfirmPopUp , rideData , rideRejected}) => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl px-5 pt-3 pb-6 shadow-2xl">

      {/* Drag Handle */}
      <div 
      onClick={() => {
        handlepopUp(false)
      }}
      className="w-9 h-1 rounded-full bg-gray-300 mx-auto mb-4 cursor-pointer"></div>

      {/* Heading */}
      <h2 className="text-[22px] font-medium text-gray-950 tracking-tight mb-4">
        New ride available
      </h2>

      {/* Passenger Card */}
      <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between mb-1">

        <div className="flex items-center gap-3 min-w-0">

          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt=""
            className="w-11 h-11 rounded-full object-cover"
          />

          <span className="text-[15px] font-medium text-gray-950 truncate">
            {typeof rideData.user === "string"
              ? rideData.user
              : rideData.user?.userName?.firstName || rideData.user?.userName?.lastName || "Rider"}
          </span>

        </div>

        <span className="text-[15px] font-medium text-gray-950 shrink-0">
          2.2 km
        </span>

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

      {/* Fare */}
      <div className="flex items-center justify-between py-4 mt-1 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <IndianRupee size={18} className="text-gray-950" />
          <p className="text-[15px] text-gray-950">Cash</p>
        </div>
        <p className="font-medium text-[16px] text-gray-950">{rideData.fare}</p>
      </div>

      {/* Buttons */}

      <div className="mt-2 space-y-2.5">

        <button
        onClick={() => {
          handleConfirmPopUp()
        }}
        className="w-full bg-gray-950 hover:bg-black active:scale-[0.98] text-white py-4 rounded-xl text-[16px] font-medium transition">
          Confirm
        </button>

        <button
        onClick={() => {
          rideRejected();
        }}
        className="w-full bg-white border border-gray-300 hover:bg-gray-50 active:scale-[0.98] py-4 rounded-xl text-[16px] font-medium text-gray-950 transition">
          Ignore
        </button>

      </div>

    </div>
  );
};

export default RidePopup;