import { ArrowLeft, CornerUpRight } from "lucide-react";
import CaptainPickupSheet from "./CaptainPickupSheet";
import { useRef, useState } from "react";

import gsap from 'gsap';
const CaptainRiding = () => {
    const panelRef = useRef(null);
const [showPickupSheet, setShowPickupSheet] = useState(false);
const [isPanelOpen, setisPanelOpen] = useState(false);

function openPanelPickup(){
    console.log("p")
     gsap.to(panelRef.current, {
        height: "75vh",
        duration: 0.4,
        ease: "power3.out",
    });
    setisPanelOpen(true)
}
function closePanelPickup(){
    console.log("c")

        gsap.to(panelRef.current, {
        height: "30vh",
        duration: 0.4,
        ease: "power3.out",
    });
    setisPanelOpen(false)
}
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">

      {/* Map */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600"
        alt="Map"
        className="w-full h-full object-cover"
      />

      {/* Navigation Banner */}
      <div className="absolute top-0 left-0 w-full z-20">

        {/* Gradient fade so the banner stays legible over any map colors underneath */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent pointer-events-none -z-10 h-24"></div>

        <div className="px-4 pt-5 pb-4 flex items-center gap-3">

          <button className="shrink-0 w-8 h-8 -ml-1 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm active:bg-white/25 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>

          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
            <CornerUpRight
              size={18}
              strokeWidth={2.5}
              className="text-gray-950"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-[18px] text-white leading-tight">
              250 m
            </span>

            <span className="text-[13px] text-gray-200 truncate leading-tight">
              Turn right at 105 William St, Chicago, US
            </span>
          </div>

        </div>

      </div>

<CaptainPickupSheet openPanel = {openPanelPickup}   panelRef={panelRef} closePanel = {closePanelPickup} panelState  = {{isPanelOpen, setisPanelOpen}}/>
    </div>
  );
};

export default CaptainRiding;