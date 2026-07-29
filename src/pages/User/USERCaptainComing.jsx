import React from 'react'
import { MapPin, Wallet } from "lucide-react";
const USERCaptainComing = ({data}) => {
  return (
        <div className="w-full bg-white rounded-t-2xl px-5 pt-3 pb-6">

      {/* Drag handle */}
      <div className="w-9 h-1 rounded-full bg-gray-300 mx-auto mb-4"></div>

      {/* Driver Info */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">

        <img
          src="/car.png" // Replace with your vehicle image
          alt="Car"
          className="w-20 object-contain"
        />

        <div className="text-right">
          <p className="text-[13px] text-gray-500">Sarthak</p>

          <h2 className="text-[18px] font-medium text-gray-950 tracking-wide">
            MP04 AB 1234
          </h2>

          <p className="text-[13px] text-gray-500">
            {data.rideData.vehicleType}
          </p>
        </div>
      </div>

      {/* Pickup */}
      <div className="flex items-center gap-3 py-4 border-b border-gray-100">
        <MapPin size={18} className="shrink-0 text-gray-950" />

        <h3 className="font-medium text-[15px] text-gray-950">
          {data.rideData.destination}
        </h3>
      </div>

      {/* Fare */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Wallet size={18} className="shrink-0 text-gray-950" />
          <p className="text-[15px] text-gray-950">Cash</p>
        </div>
        <p className="font-medium text-[16px] text-gray-950">{data.rideData.fare}</p>
      </div>

      {/* Button */}
      <button 
      onClick={() => {
        data.finishRideByUser();
      }}
      className="w-full bg-gray-950 hover:bg-black active:scale-[0.98] transition text-white text-[16px] font-medium py-4 rounded-xl mt-2">
        Complete ride
      </button>

    </div>
  )
}

export default USERCaptainComing