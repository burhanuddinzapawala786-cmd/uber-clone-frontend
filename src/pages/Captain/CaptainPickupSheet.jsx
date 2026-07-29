import {
  Circle,
  MapPinned,
  ArrowUp,
  CornerLeftUp,
  CornerRightUp,
} from "lucide-react";
import { useRef, useState } from "react";
import gsap from 'gsap'
const CaptainPickupSheet = ({openPanel , closePanel , panelRef , panelState , rideData}) => {

  return (
    <div 
   ref={panelRef}
    className="absolute bottom-0 left-0 w-full h-[30vh] bg-white rounded-t-2xl shadow-[0_-2px_16px_rgba(0,0,0,0.08)] z-30 overflow-hidden">

      {/* Drag Handle */}
      <div 
onClick={() => {
  if(panelState.isPanelOpen){
    closePanel()
  }else{
       openPanel()
    }
}}
      className="flex justify-center pt-3 pb-4 cursor-pointer">
        <div className="w-9 h-1 rounded-full bg-gray-300" />
      </div>

      {/* Pickup Card */}
      <div className="px-5 pb-4 border-b border-gray-100">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-gray-950 flex items-center justify-center text-white text-[13px] font-medium shrink-0">
            A
          </div>

          <div className="min-w-0">
            <p className="text-[12px] text-gray-500">
              Pick up at
            </p>

            <h2 className="text-[16px] font-medium text-gray-950 truncate">
             {rideData.pickup}
            </h2>
          </div>

        </div>

      </div>

      {/* Ride Details */}

      <div className="grid grid-cols-3 text-center px-5 py-3.5 border-b border-gray-100">

        <div>
          <p className="text-[11px] text-gray-500 uppercase tracking-wide">
            Est
          </p>

          <h3 className="font-medium text-[16px] text-gray-950 mt-0.5">
            5 min
          </h3>
        </div>

        <div className="border-x border-gray-100">
          <p className="text-[11px] text-gray-500 uppercase tracking-wide">
            Distance
          </p>

          <h3 className="font-medium text-[16px] text-gray-950 mt-0.5">
            2.2 km
          </h3>
        </div>

        <div>
          <p className="text-[11px] text-gray-500 uppercase tracking-wide">
            Fare
          </p>

          <h3 className="font-medium text-[16px] text-gray-950 mt-0.5">
            ₹{rideData.fare}
          </h3>
        </div>

      </div>

      {/* Drop Button */}

      <div className="px-5 py-3.5">

        <button className="w-full bg-gray-950 hover:bg-black active:scale-[0.98] transition text-white rounded-xl py-3.5 text-[15px] font-medium">
          Complete ride
        </button>

      </div>

      {/* Directions */}

      <div className="overflow-y-auto h-[150px] px-5 pb-4 space-y-4">

        <div className="flex gap-3">

          <ArrowUp size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />

          <div className="min-w-0">
            <h3 className="text-[14px] font-medium text-gray-950 truncate">
              Head southwest on Madison St
            </h3>

            <p className="text-[12px] text-gray-500">
              18 miles
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <CornerLeftUp size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />

          <div className="min-w-0">
            <h3 className="text-[14px] font-medium text-gray-950 truncate">
              Turn left onto 4th Ave
            </h3>

            <p className="text-[12px] text-gray-500">
              12 miles
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <div className="w-6 h-6 rounded-full bg-gray-950 flex items-center justify-center shrink-0 mt-0.5">
            <CornerRightUp size={13} className="text-white" strokeWidth={2.5} />
          </div>

          <div className="min-w-0">
            <h3 className="text-[14px] font-medium text-gray-950 truncate">
              Turn right at 105 William St
            </h3>

            <p className="text-[12px] text-gray-500">
              250 metres
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <ArrowUp size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />

          <div className="min-w-0">
            <h3 className="text-[14px] font-medium text-gray-950 truncate">
              Continue straight
            </h3>

            <p className="text-[12px] text-gray-500">
              24 miles
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CaptainPickupSheet;