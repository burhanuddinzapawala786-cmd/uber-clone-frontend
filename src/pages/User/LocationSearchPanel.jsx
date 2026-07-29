import React, { useEffect , useState } from "react";
import { RiMapPinFill } from "react-icons/ri";
import axios from 'axios';

const LocationSearchPanel = ({handleLocation , locations}) => {


  return (


    <div className="mt-6 flex flex-col gap-3 overflow-scroll">

    {locations.map((location, index) => (
        <div
        
          key={index}
          onClick={() => handleLocation(location.label)}
          className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 cursor-pointer transition-all hover:border-black hover:bg-gray-50"
        >
         
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <RiMapPinFill size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {location.label}
            </h3>

            <p className="text-sm text-gray-500">
              {location.label}
            </p>
          </div>
        </div>
      ))}

    </div>

    
  );
};

export default LocationSearchPanel;