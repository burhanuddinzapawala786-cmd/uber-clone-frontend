import { useRef, useState, useEffect, useContext } from "react";
import { gsap } from "gsap";
import LocationSearchPanel from "./LocationSearchPanel";
import VehicleSelectionUserPanel from "./VehicleSelectionUserPanel";
import ConfirmRide from "../ConfirmRide";
import LookingForDriver from "./LookinForDriver";
import axios from "axios";
import { UserContextGlobal } from "../../../context/UserContext";
import { io } from "socket.io-client";
import USERCaptainComing from "./USERCaptainComing";
import { LogOut } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";
import MoveCamera from "../MoveCamera";
import NoDriver from "../../Error/NoDriver";
import NoNetwork from "../../Error/NoNetwork";
import RideCancelled from "../../Error/RideCancelled";

const apiBaseUrl = (import.meta.env.VITE_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const socketBaseUrl = (import.meta.env.VITE_SOCKET_URL || apiBaseUrl || "http://localhost:3000").replace(/\/$/, "");
const socket = io(socketBaseUrl);

const HomeLogged = () => {
const {userdata} = useContext(UserContextGlobal)

if(userdata.email == 'user1@gmail.com'){
  socket.emit('live-location' , {
  latitude : 19.9786,
    id:userdata._id,
  longitude :  73.7915
  })
}
if(userdata.email == 'user2@gmail.com'){
   socket.emit('live-location' , {
    id:userdata._id,
  latitude : 19.0760,
  longitude :72.8777
  })
}
if(userdata.email == 'user3@gmail.com'){
  socket.emit('live-location' , {
  latitude : 22.7196,
    id:userdata._id,
  longitude :75.8577
  })
}



  useEffect(() => {
  socket.emit('join' , {
    userType:'user',
    userId:userdata._id
  })
  }, [userdata._id])
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fareData, setfareData] = useState(null);
  const [showLookingForDriver, setShowLookingForDriver] = useState(false);
  const lookingForDriverRef = useRef(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);

  const [suggestions, setsuggestions] = useState([]);
  const [vehicleType, setvehicleType] = useState(null)
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const panelRef = useRef(null);

  const [rideData, setrideData] = useState(null)
  const [captainData, setcaptainData] = useState(null)

const [currlatitude, setCurrlatitude] = useState(null)
const [currlongitude, setCurrlongitude] = useState(null)

const [pickupLat, setpickupLat] = useState(null)
const [pickupLong, setpickupLong] = useState(null)

const [destLat, setdestLat] = useState(null)
const [destLong, setdestLong] = useState(null)
const [waitingForDriver, setwaitingForDriver] = useState(false)
const [rideError, setRideError] = useState('');
const [rideErrorType, setRideErrorType] = useState('');

const clearRideError = () => {
  setRideErrorType('');
  setRideError('');
};







useEffect(() => {
   socket.on('userLocServer' , (data) => {
    console.log("lat from user is :" , data.latitude)
  setCurrlatitude(data.latitude);
  setCurrlongitude(data.longitude);
})
}, [currlatitude,currlongitude])

  const [selectedFare, setselectedFare] = useState(null)
  useEffect(() => {
    async function fetchSuggestions() {
        const query = activeField === "pickup" ? pickup : destination;
        if (!query.trim()) {
            setsuggestions([]);
            return;
        }
        try {
const response = await axios.get(
    `${apiBaseUrl}/map/get-suggestions`,
    {
        params: {
            location: query
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
);
const suggesstions = response.data.suggestions;
setsuggestions(suggesstions)
        } catch (err) {
            console.log(err);
        }
    }
    fetchSuggestions();
}, [pickup, destination, activeField]);
      

useEffect(() => {
    if (!showVehiclePanel) return;
    if (!pickup.trim() || !destination.trim()) return;

    async function fetchFare() {
        const response = await axios.post(
            `${apiBaseUrl}/fare/getFare`,
            {
                pickup,
                destination
            }
        );
        console.log(response.data.fares)
        setfareData(response.data.fares);
    }

    fetchFare();

}, [showVehiclePanel, pickup, destination]);




  async function handleLocationSelect(location) {
    if (activeField === "pickup") {
      setPickup(location);

       const latAndLongOfPickup = await axios.get(
    `${import.meta.env.VITE_BASE_URL}map/get-coordinates`,
    // request body (empty if not needed)
    {
        params: {
            address: location
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
);
  const pickupLat = latAndLongOfPickup.data.coordinates[1];
  const pickupLong = latAndLongOfPickup.data.coordinates[0];
  setpickupLat(pickupLat)
  setpickupLong(pickupLong)

      if (destination.trim() !== "") {
        closePanel();
        setShowVehiclePanel(true);
      }
    } else {
      setDestination(location);

 const latAndLongOfDestination = await axios.get(
    `${import.meta.env.VITE_BASE_URL}map/get-coordinates`,
    // request body (empty if not needed)
    {
        params: {
            address: location
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
);
  const destLat = latAndLongOfDestination.data.coordinates[1];
  const destLong = latAndLongOfDestination.data.coordinates[0];
  setdestLat(destLat)
  setdestLong(destLong)



      if (pickup.trim() !== "") {
        closePanel();
        setShowVehiclePanel(true);
      }
    }
  }

  const openPanel = () => {
    if (panelOpen) return;

    setPanelOpen(true);

    gsap.to(panelRef.current, {
      height: "100vh",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const closePanel = () => {
    gsap.to(panelRef.current, {
      height: "32vh",
      duration: 0.35,
      ease: "power3.inOut",
      onComplete: () => setPanelOpen(false),
    });
  };

  useEffect(() => {
    if (showVehiclePanel && vehiclePanelRef.current) {
      gsap.fromTo(
        vehiclePanelRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.5, ease: "power3.out" }
      );
    }
  }, [showVehiclePanel]);

  useEffect(() => {
    if (confirmRidePanel && confirmRideRef.current) {
      gsap.fromTo(
        confirmRideRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.5, ease: "power3.out" }
      );
    }
  }, [confirmRidePanel]);


  
useEffect(() => {
  if (showLookingForDriver && lookingForDriverRef.current) {
    gsap.fromTo(
      lookingForDriverRef.current,
      { y: "100%" },
      { y: "0%", duration: 0.5, ease: "power3.out" }
    );
  }
}, [showLookingForDriver]);

  function handleConfirmRide() {
    setShowVehiclePanel(false);
    setconfirmRidePanel(true);
  
  }
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
async function handleFinalConfirm() {
    try {
        console.log("Booking ride...");

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}ride/create-ride`,
            {
                user:userdata._id,
                pickup,
                destination,
                vehicleType,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );


        const latAndLongOfPickup = await axios.get(
    `${import.meta.env.VITE_BASE_URL}map/get-coordinates`,
    // request body (empty if not needed)
    {
        params: {
            address: pickup
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
);
const coords =  latAndLongOfPickup.data.coordinates;
 
        // SOKCET NEW RIDE: 
      const newRide = {
      user:userdata.userName.firstName,
      pickup:pickup,
      destination:destination,
      fare:selectedFare,
      vehicleType:vehicleType,
      otp:response.data.newRide.otp,
      rideId:response.data.newRide._id,
      userId:userdata._id,
      status:'pending',

      cords:{
        pickupLat:coords[1],
        pickupLong:coords[0],
        destLat : destLat,
        destLong : destLong,
      }
    }
    socket.emit('new-ride' , newRide)


        setconfirmRidePanel(false);
        setShowLookingForDriver(true);

    } catch (err) {
        if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
            setRideErrorType('network');
            setRideError('We could not connect to the server. Please check your connection and try again.');
        } else if (err.response?.status === 404 || err.response?.status === 400) {
            setRideErrorType('nodriver');
            setRideError(err.response?.data?.message || 'No driver is available right now.');
        } else {
            setRideErrorType('ride');
            setRideError(err.response?.data?.message || 'We could not book your ride. Please try again.');
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
    socket.on('ride-accepted' , (data) => {
  setrideData(data.rideData)
  setcaptainData(data.captaindata)
  setShowLookingForDriver(false)
  setwaitingForDriver(true)
})

function finishRideByUser(){
  setwaitingForDriver(false)
}


useEffect(() => {
   async function checkCurrentRide() {
      try {
        const token = localStorage.getItem("token");
        console.log("checkCurrentRide: token present?", !!token);
        const response = await axios.get(`${apiBaseUrl}/ride/current-ride/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params:{
            userId:userdata._id
          }
        });

        console.log("checkCurrentRide response:", response && response.status, response && response.data);


        if (response && response.status === 200) {
          const ride = response.data.ride;
          setrideData(ride);

          switch (ride.status) {
            case "initialapprovalPending":
              console.log("waitng for driver page??")
              setShowLookingForDriver(true)
              break;

            case "ongoing":
                
              break;

            default:
              break;
          }
        }
      } catch (err) {
       console.error("checkCurrentRide error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
       setRideErrorType('network');
       setRideError('We could not refresh your ride state. Please try again.');
      }
    }

    checkCurrentRide();
}, [userdata._id])

  return (
  
 
    <div className="relative w-full h-screen overflow-hidden  ">


        
      {currlatitude != null && currlongitude != null && (
       <MapContainer
  center={[currlatitude, currlongitude]}
  zoom={13}
  className="absolute inset-0 z-0"
  zoomControl={false}
  scrollWheelZoom={true}
>
  <TileLayer
    attribution="&copy; OpenStreetMap contributors"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
      


  {currlatitude && currlongitude && (
    <Marker
      position={[currlatitude, currlongitude]}
    >
      <Popup>Pickup</Popup>
    </Marker>
  )} 
  {pickupLat && pickupLong && (
    <Marker
      position={[pickupLat, pickupLong]}
    >
      
<MoveCamera location = {{pickupLat , pickupLong}}/>

      <Popup>Pickup</Popup>
    </Marker>
  )}

  {destLat && destLong && (
    <Marker
      position={[
        destLat,
        destLong,
      ]}
    >
<MoveCamera location = {{destLat , destLong}}/>

      <Popup>Destination</Popup>
    </Marker>
  )}

  {pickupLat && destLat && (
    
    <Polyline
      positions={[
        [pickupLat , pickupLong],
        [destLat , destLong]
      ]}
      pathOptions={{
        color: "#2563eb",
        weight: 5,
        opacity: 0.9,
      }}
    />
  )}
</MapContainer>
      )}
<div className=" z-10">
  {panelOpen && (
        <div
          onClick={closePanel}
          className="w-full h-max inset-0 bg-black/40 z-10"
        />
      )}

      <h1 className="absolute top-5 text-2xl font-bold ml-1.5 left-5 z-20 w-16 text-black">
        Uber
      </h1>
      <div className="absolute top-5 right-5 z-20">
    <div className="w-9 h-9 rounded-full bg-black/95 flex items-center justify-center shadow-sm">
        <LogOut 
        onClick={() => {
            localStorage.removeItem('token')
          }}
        className="w-4.5 h-4.5 text-white" />
    </div>
</div>

      {rideErrorType === 'network' && (
        <NoNetwork message={rideError} onRetry={clearRideError} onClose={clearRideError} />
      )}
      {rideErrorType === 'nodriver' && (
        <NoDriver message={rideError} onRetry={clearRideError} onClose={clearRideError} />
      )}
      {rideErrorType === 'ride' && (
        <RideCancelled message={rideError} onRetry={clearRideError} onClose={clearRideError} />
      )}

      {/* Search Bottom Sheet */}
      {!showVehiclePanel && !confirmRidePanel && (
        <div
          ref={panelRef}
          className="absolute bottom-0 left-0 z-20 w-full bg-white rounded-t-3xl shadow-2xl px-6 pt-4 overflow-hidden"
          style={{ height: "32vh" }}
        >
          <div className="w-14 h-1.5 rounded-full bg-gray-300 mx-auto mb-5"></div>

          {panelOpen && (
            <button
              onClick={closePanel}
              className="absolute right-6 top-4 text-3xl"
            >
              ↓
            </button>
          )}

          <h2 className="text-3xl font-bold mb-6">Find a trip</h2>

          <div className="space-y-4">
            <input
              value={pickup}
              onFocus={() => {
                openPanel();
                setActiveField("pickup");
              }}
              onChange={(e) =>  {
                 setPickup(e.target.value)
              }
               
              }
              placeholder="Add a pick-up location"
              className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
            />

            <input
              value={destination}
              onFocus={() => {
                openPanel();
                setActiveField("destination");
              }}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              placeholder="Enter your destination"
              className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
            />
          </div>
         


          
          <LocationSearchPanel handleLocation={handleLocationSelect} locations = {suggestions} />
        </div>
      )}
           {waitingForDriver && (
    <div className="absolute bottom-0 left-0 z-50 w-full">
        <USERCaptainComing data = {{rideData , captainData , finishRideByUser}}/>
    </div>
)}
      {/* Vehicle Bottom Sheet */}
      {showVehiclePanel && fareData && (
        <div
          ref={vehiclePanelRef}
          className="absolute bottom-0 left-0 z-30 w-full bg-white rounded-t-3xl shadow-2xl"
        >
          <VehicleSelectionUserPanel handleConfirmRide={handleConfirmRide} fareData = {fareData} selectFare = {setselectedFare} vehicleType = {setvehicleType}/>
        </div>
      )}

      {/* Confirm Ride Bottom Sheet */}
      {confirmRidePanel && !showVehiclePanel &&  (
        <div
          ref={confirmRideRef}
          className="absolute bottom-0 left-0 z-40 w-full"
        >
          <ConfirmRide
            pickup={pickup}
            destination={destination}
            fare={selectedFare}
            onConfirm={handleFinalConfirm}
          />
        </div>
      )}

{showLookingForDriver &&   (
  <div
    ref={lookingForDriverRef}
    className="absolute bottom-0 left-0 z-50 w-full"
  >
    <LookingForDriver
      pickup={pickup}
      destination={destination}
      fare={selectedFare}
      onCancel={() => {
         setShowLookingForDriver(false);


         setRideErrorType('ride');
         setRideError('Your ride has been cancelled.');
         socket.emit('rideCancelledFromUser' , {
          rideData: rideData
         })


        }
      }
    />
  </div>
)}
</div>
</div>

    
  );
};

export default HomeLogged;