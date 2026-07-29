import React from "react";

const ConfirmedRide = ({
  driverName = "Santh",
  vehicleNumber = "KA15AK00-0",
  vehicleModel = "White Suzuki S-Presso LXI",
  rating = "4.9",
  etaMinutes = "2",
  driverPhoto,
  onSendMessage,
  onSafety,
  onShareTrip,
  onCallDriver,
}) => {
  return (
    <div className="w-full bg-white rounded-t-3xl shadow-2xl px-6 pt-5 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Meet at the pickup point</h2>
        <div className="bg-black text-white rounded-xl px-4 py-2 text-center">
          <p className="text-xl font-bold leading-tight">{etaMinutes}</p>
          <p className="text-xs leading-tight">min</p>
        </div>
      </div>

      <hr className="border-gray-200 mb-5" />

      {/* Driver + Vehicle info */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center -space-x-3">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white z-10 flex items-center justify-center">
            {driverPhoto ? (
              <img src={driverPhoto} alt={driverName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl">🧑</span>
            )}
          </div>
          <div className="w-24 h-16 flex items-center justify-center">
            <span className="text-4xl">🚗</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-gray-500 text-sm">{driverName.toUpperCase()}</p>
          <p className="text-2xl font-bold leading-tight">{vehicleNumber}</p>
          <p className="text-gray-500 text-sm">{vehicleModel}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span>⭐</span>
            <span className="text-gray-700">{rating}</span>
          </div>
        </div>
      </div>

      {/* Message input */}
      <button
        onClick={onSendMessage}
        className="w-full flex items-center justify-between bg-gray-100 rounded-2xl px-5 py-4 mb-6 text-left"
      >
        <span className="text-gray-500">Send a message...</span>
        <span className="text-gray-500">➤</span>
      </button>

      {/* Action buttons */}
      <div className="flex justify-around">
        <button onClick={onSafety} className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-blue-600 text-xl">🛡️</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Safety</span>
        </button>

        <button onClick={onShareTrip} className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-blue-600 text-xl">📍</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Share my trip</span>
        </button>

        <button onClick={onCallDriver} className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-blue-600 text-xl">📞</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Call driver</span>
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;