import { LogOut } from "lucide-react";
import RidePopup from "./NewRidePopUp";
import { useState } from "react";
import AcceptRideUiCaptain from "./AcceptRideUiCaptain";
import { io } from "socket.io-client";
import { CaptainContextGlobal } from "../../../context/CaptainContext";
import { useContext, useEffect } from "react";
import CaptainPickupSheet from "./CaptainPickupSheet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";
import MoveCamera from "../MoveCamera";
import axios from "axios";
import NoNetwork from "../../Error/NoNetwork";
import NoDriver from "../../Error/NoDriver";

const apiBaseUrl = (import.meta.env.VITE_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const socketBaseUrl = (import.meta.env.VITE_SOCKET_URL || apiBaseUrl || "http://localhost:3000").replace(/\/$/, "");
const socket = io(socketBaseUrl);

const CaptainHome = () => {
  const [captainTypedOtp, setcaptainTypedOtp] = useState(null);
  const [rideData, setrideData] = useState({});
  const { captaindata } = useContext(CaptainContextGlobal);
  const [captainRiding, setcaptainRiding] = useState(false);
//MAP: 
 
const [currLat, setcurrLat] = useState(null);
const [currLong, setcurrLong] = useState(null);


const [pickupLat, setpickupLat] = useState(null);
const [pickupLong, setpickupLong] = useState(null);

const [destLat] = useState(null);
const [destLong] = useState(null);

  const [ridePopUpPanel, setridePopUpPanel] = useState(false);
  const [acceptRideByCaptainPanel, setacceptRideByCaptainPanel] = useState(false);
  const [initialPanel, setinitialPanel] = useState(true);
  const [captainError, setCaptainError] = useState('');
  const [captainErrorType, setCaptainErrorType] = useState('');

  

  const clearCaptainError = () => {
    setCaptainErrorType('');
    setCaptainError('');
  };

  const resetRideUiState = () => {
    setrideData(null);
    setcaptainRiding(false);
    setridePopUpPanel(false);
    setacceptRideByCaptainPanel(false);
    setinitialPanel(true);
  };


  useEffect(() => {
    if (!captaindata) return;

    if (captaindata.email === "captain1@gmail.com") {
       setcurrLat(19.9785);
       setcurrLong(73.7909);
    }

    else if (captaindata.email === "captain2@gmail.com") {
        setcurrLat(19.9725);
        setcurrLong(73.7975);
        }

   else  if (captaindata.email === "captain3@gmail.com") {
      setcurrLat(19.9845);
      setcurrLong(73.7867);
    }
  }, [captaindata?.email]);

  useEffect(() => {
    if (!captaindata) return;
    if (currLat == null || currLong == null) return;

    socket.emit("join", {
      userId: captaindata._id,
      userType: "captain",
      long: currLong,
      lat: currLat,
    });
  }, [captaindata, currLat, currLong]);










 const handleNewRide = (data) => {
      console.log("CAPTAIN PAGE:", data);
      setinitialPanel(false);
      setridePopUpPanel(true);
      setrideData(data);
      setpickupLat(data.cords.pickupLat);
      setpickupLong(data.cords.pickupLong);
      console.log(data);
    };

    const handleRideExpired = (data) => {
      resetRideUiState();
      setCaptainErrorType('ride');
      setCaptainError(data?.message || 'This ride expired. Please try again.');
    };

    const handleRideTaken = (data) => {
      resetRideUiState();
      setCaptainErrorType('ride');
      setCaptainError(data?.message || 'This ride was already taken by another captain.');
    };

    socket.on("new-ride", handleNewRide);
    socket.on("ride-expired", handleRideExpired);
    socket.on("ride-taken", handleRideTaken);




  
  useEffect(() => {
    if (!captaindata) return;




     checkCurrentRide();

   

   
    async function checkCurrentRide() {
      try {

        
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiBaseUrl}/ride/current-ride/captain`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params:{
            captainId:captaindata._id
          }
        });
console.log("response : " , response)

        if (response && response.status === 200) {
          const ride = response.data.ride;
          setrideData(ride);
          console.log(ride)
          switch (ride.status) {
            case "pending":
              setridePopUpPanel(true)
              setinitialPanel(false)
              setcaptainRiding(false)
              break;
            case "accepted":
              setridePopUpPanel(false)
              setcaptainRiding(true)

              setinitialPanel(false)
              break;
          
            case "ongoing":
              setcaptainRiding(true)
              setridePopUpPanel(false)
              setacceptRideByCaptainPanel(false)
              setinitialPanel(false)
              break;
      
            case "cancelled":
              resetRideUiState();
              break;
            default:
              resetRideUiState();
              break;
          }
        }
      } catch (err) {
        if (err.response?.status === 404) {
          resetRideUiState();
        } else {
          console.error("checkCurrentRide error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
        }
      }
    }

   
  }, [captaindata?._id]);

  

////////////////////////////////////
//////////////////////////////
/////////////////////////////////
  function rideAcceptByCaptain() {
    setridePopUpPanel(false);
    setcaptainRiding(true);
     socket.emit("ride-accepted", {
        captaindata,
        rideData: { ...rideData, status: "accepted" }
      });
  }

  //////////////////////////////////////////////////////////////////////////////
  function rideBookedCaptain() {
    if (captainTypedOtp === rideData.otp) {
console.log("ride from captain" , rideData)

      setacceptRideByCaptainPanel(false);
      setinitialPanel(false);
      setcaptainRiding(true);
      
    } else {
      setCaptainErrorType('nodriver');
      setCaptainError('The OTP does not match. Please check the code and try again.');
    }
  }
// socket listeners moved into useEffect

function rideCancelledByCaptain() {
  console.log("ride rejected by captain")
  setridePopUpPanel(false);
  setinitialPanel(true)
  socket.emit('ride-cancelled', { rideData, captaindata });
}


function hasArrived() {
  socket.emit('ride-arrived', { rideData, captaindata });
  setacceptRideByCaptainPanel(true);
}

function rideCancelled() {
      socket.emit('ride-cancelled', { rideData, captaindata });
      setcaptainRiding(false);
      setinitialPanel(true);
}
  return (
    <div className="h-screen w-full relative overflow-hidden">

      {/* Header */}
      <div className="absolute top-0 left-0 w-full px-5 pt-5 flex justify-between items-center z-20">
        <h1
          className="text-2xl font-bold text-black tracking-tight"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.35)" }}
        >
          Uber
        </h1>

        <div
        onClick={() => {
            localStorage.removeItem('token')
          }}
        className="w-9 h-9 rounded-full bg-black/95 flex items-center justify-center shadow-sm">
          <LogOut 
          
          className="w-4.5 h-4.5 text-white" />
        </div>
      </div>

      {/* Map — always full height, never shrinks when panels mount/unmount */}
      <div className="relative w-full h-screen overflow-hidden  ">
          {currLat != null && currLong != null && (
       <MapContainer
  center={[currLat, currLong]}
  zoom={13}
  className="absolute inset-0 z-0"
  zoomControl={false}
  scrollWheelZoom={true}
>
  <TileLayer
    attribution="&copy; OpenStreetMap contributors"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
      


  {currLat && currLong && (
    <Marker
      position={[currLat, currLong]}
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
       
      </div>

      {captainErrorType === 'network' && (
        <NoNetwork message={captainError} onRetry={clearCaptainError} onClose={clearCaptainError} />
      )}
      {captainErrorType === 'nodriver' && (
        <NoDriver message={captainError} onRetry={clearCaptainError} onClose={clearCaptainError} />
      )}

      {/* Bottom Panel — overlays the map instead of sharing flex height with it */}
      {initialPanel && (
        <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl px-5 pt-4 pb-5 z-10">
          <div className="w-9 h-1 rounded-full bg-gray-300 mx-auto mb-4"></div>

          {/* Captain Info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="min-w-0">
                <h2 className="text-[16px] font-medium text-gray-950 truncate">
                  Harsh Patel
                </h2>

                <p className="text-gray-500 text-[13px]">Captain</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <h1 className="text-[20px] font-medium text-gray-950">₹295.20</h1>
              <p className="text-gray-500 text-[13px]">Today</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 bg-gray-50 rounded-2xl px-4 py-5 flex justify-between">
            {/* Hours */}
            <div className="flex flex-col items-center flex-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-5 h-5 text-gray-950 mb-2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <h3 className="font-medium text-[16px] text-gray-950">10.2</h3>

              <p className="text-gray-500 text-[12px] text-center mt-0.5">
                Hours online
              </p>
            </div>

            <div className="w-px bg-gray-200 mx-2"></div>

            {/* Trips */}
            <div className="flex flex-col items-center flex-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-5 h-5 text-gray-950 mb-2"
              >
                <path
                  d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="3" y="11" width="18" height="6" rx="1.5" />
                <circle cx="7.5" cy="17" r="1.3" fill="currentColor" stroke="none" />
                <circle cx="16.5" cy="17" r="1.3" fill="currentColor" stroke="none" />
              </svg>

              <h3 className="font-medium text-[16px] text-gray-950">18</h3>

              <p className="text-gray-500 text-[12px] text-center mt-0.5">
                Trips completed
              </p>
            </div>

            <div className="w-px bg-gray-200 mx-2"></div>

            {/* Rating */}
            <div className="flex flex-col items-center flex-1">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-950 mb-2">
                <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7-5.4-4.7 7.1-.6z" />
              </svg>

              <h3 className="font-medium text-[16px] text-gray-950">4.9</h3>

              <p className="text-gray-500 text-[12px] text-center mt-0.5">Rating</p>
            </div>
          </div>
        </div>
      )}

      {captainRiding && <CaptainPickupSheet 
      rideCancelled = {rideCancelled}
      hasArrived={hasArrived}
      rideData={rideData}/>}

      {ridePopUpPanel && (
        <RidePopup
          rideData={rideData}
          
          rideRejected={rideCancelledByCaptain}
          handleConfirmPopUp={rideAcceptByCaptain}
        />
      )}

      {acceptRideByCaptainPanel && (
        <div className="absolute inset-0 z-50 flex items-end">
          <AcceptRideUiCaptain
            confirmFunc={rideBookedCaptain}
            rideData={rideData}
            setOtp={setcaptainTypedOtp}
            handlepopUp={setridePopUpPanel}
          />
        </div>
      )}



    </div>
  );
};

export default CaptainHome;