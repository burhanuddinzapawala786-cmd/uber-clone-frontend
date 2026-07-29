import React from "react";
import { io } from "socket.io-client";
const ConfirmRide = ({
  pickup = "562/11-A",
  destination = "562/11-A",
  fare,
  paymentMode = "Cash Cash",
  onConfirm,
}) => {

  
  return (
    <div className="w-full bg-white rounded-t-2xl px-5 pt-3 pb-6">
      {/* Drag handle */}
      <div className="w-9 h-1 rounded-full bg-gray-300 mx-auto mb-4"></div>

      <h2 className="text-[22px] font-medium text-gray-950 mb-4 tracking-tight">
        Confirm your ride
      </h2>

      {/* Car image */}
      <div className="flex justify-center mb-2">
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/60/2e34ba-6b25-4e75-b3e7-33ba2b40e8c9/original/UberX.png"
          alt="Vehicle"
          className="w-40 h-auto object-contain"
        />
      </div>

      {/* Route */}
      <div className="flex gap-3 py-2">
        {/* Line + dots */}
        <div className="flex flex-col items-center pt-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-950"></div>
          <div className="w-[2px] flex-1 min-h-[28px] bg-gray-300 my-1"></div>
          <div className="w-2.5 h-2.5 rounded-sm bg-gray-950"></div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Pickup */}
          <div className="pb-4 border-b border-gray-100">
            <p className="font-medium text-[15px] text-gray-950 leading-tight truncate">
              {pickup}
            </p>
          </div>

          {/* Destination */}
          <div className="pt-4">
            <p className="font-medium text-[15px] text-gray-950 leading-tight truncate">
              {destination}
            </p>
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
          <p className="text-[15px] text-gray-950">{paymentMode}</p>
        </div>
        <p className="font-medium text-[16px] text-gray-950">₹{fare}</p>
      </div>

      {/* Confirm button */}
      <button
        onClick={() => {
            onConfirm();
        }}
        className="w-full bg-gray-950 hover:bg-black active:scale-[0.98] transition text-white text-[16px] font-medium py-4 rounded-xl mt-2"
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRide;