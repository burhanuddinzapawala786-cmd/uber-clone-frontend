import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
const MoveCamera = ({location}) => {
console.log(location)
   
    const map = useMap();

    useEffect(() => {
        if (location) {

            {
        if(location.pickupLat && location.pickupLong) map.flyTo([location.pickupLat, location.pickupLong], 15);
        if(location.destLat && location.destLong) map.flyTo([location.destLat, location.destLong], 15);
            }
        }
    }, [location]);

   
}

export default MoveCamera
