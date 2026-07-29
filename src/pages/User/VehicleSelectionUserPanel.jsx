import React from 'react'



const VehicleSelectionUserPanel = ({handleConfirmRide , fareData , selectFare , vehicleType}) => {
const vehicles = [
  {
    name: "car",
    seats: 4,
    time: "2 mins away",
    desc: "Affordable, compact rides",
    price: `₹${fareData.car}`,
  },
  {
    name: "motorcycle",
    seats: 1,
    time: "3 mins away",
    desc: "Quick & affordable bike rides",
    price: `₹${fareData.motorcycle}`,
  },
  {
    name: "auto",
    seats: 3,
    time: "2 mins away",
    desc: "Affordable auto rides",
    price: `₹${fareData.auto}`,
  },
];



   return (
    <div className="w-full bg-white rounded-t-2xl px-4 pt-3 pb-6">

      {/* Handle */}
      <div className="w-9 h-1 rounded-full bg-gray-300 mx-auto mb-4"></div>

      <h2 className="text-[22px] font-medium text-gray-950 mb-1 tracking-tight">
        Choose a ride
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        Recommended for you
      </p>

      <div className="divide-y divide-gray-100">

        {vehicles.map((vehicle, index) => (
          <div
            onClick={() => {
              handleConfirmRide();
              selectFare(fareData[`${vehicle.name}`])
              vehicleType(vehicle.name)
            }}

            key={index}
            className="flex items-center justify-between gap-3 py-3.5 px-2 -mx-2 rounded-xl cursor-pointer transition-colors duration-150 hover:bg-gray-50 active:bg-gray-100"
          >
            {/* Left */}

            <div
            className="flex items-center gap-3 min-w-0">

              <img
               
                alt={vehicle.name}
                className="w-16 h-16 object-contain shrink-0"
              />

              <div className="min-w-0">

                <div className="flex items-center gap-1.5">

                  <h3 className="font-medium text-[16px] text-gray-950 capitalize truncate">
                    {vehicle.name}
                  </h3>

                  <span className="flex items-center gap-0.5 text-[13px] text-gray-500 shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z"/>
                    </svg>
                    {vehicle.seats}
                  </span>

                </div>

                <p className="text-[13px] text-gray-500 mt-0.5">
                  {vehicle.time} <span className="text-gray-400">·</span> {vehicle.desc}
                </p>

              </div>

            </div>

            {/* Price */}

            <h2 className="text-[16px] font-medium text-gray-950 whitespace-nowrap shrink-0">
              {vehicle.price}
            </h2>

          </div>
        ))}

      </div>

    </div>
  );
}

export default VehicleSelectionUserPanel