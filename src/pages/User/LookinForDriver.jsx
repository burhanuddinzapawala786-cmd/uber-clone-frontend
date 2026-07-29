import React from "react";

const LookingForDriver = ({
  pickup = "562/11-A",
  pickupArea = "Kankariya Talab, Bhopal",
  destination = "562/11-A",
  destinationArea = "Kankariya Talab, Bhopal",
  fare ,
  vehicleType = "UberGo",
  onCancel,
}) => {
  return (
    <div className="w-full bg-white rounded-t-2xl px-5 pt-3 pb-6">
      <div className="w-9 h-1 rounded-full bg-gray-300 mx-auto mb-4"></div>

      <h2 className="text-[22px] font-medium text-gray-950 tracking-tight">Looking for a driver</h2>
      <p className="text-gray-500 text-[13px] mb-5">{vehicleType}</p>

      {/* Pulsing radar loader */}
      <div className="flex justify-center mb-5">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gray-100 animate-ping opacity-75"></div>
          <div className="relative w-16 h-16 rounded-full bg-gray-950 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-7 h-7">
              <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="11" width="18" height="6" rx="1.5" />
              <circle cx="7.5" cy="17" r="1.5" fill="white" stroke="none" />
              <circle cx="16.5" cy="17" r="1.5" fill="white" stroke="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* Route */}
      <div className="flex gap-3 py-2">
        <div className="flex flex-col items-center pt-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-950"></div>
          <div className="w-[2px] flex-1 min-h-[36px] bg-gray-300 my-1"></div>
          <div className="w-2.5 h-2.5 rounded-sm bg-gray-950"></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="pb-4 border-b border-gray-100">
            <p className="font-medium text-[15px] text-gray-950 leading-tight truncate">{pickup}</p>
            <p className="text-gray-500 text-[13px] truncate">{pickupArea}</p>
          </div>

          <div className="pt-4">
            <p className="font-medium text-[15px] text-gray-950 leading-tight truncate">{destination}</p>
            <p className="text-gray-500 text-[13px] truncate">{destinationArea}</p>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="flex items-center justify-between py-4 mt-1 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-gray-950">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M3 10h18" strokeLinecap="round" />
          </svg>
          <p className="text-[15px] text-gray-950">Cash Cash</p>
        </div>
        <p className="font-medium text-[16px] text-gray-950">₹{fare}</p>
      </div>

      <button
        onClick={onCancel}
        className="w-full bg-black hover:bg-gray-50 active:scale-[0.98] transition
        border border-gray-300
        text-white text-[16px] font-medium py-4 rounded-xl mt-3"
      >
        Cancel ride
      </button>
    </div>
  );
};

export default LookingForDriver;