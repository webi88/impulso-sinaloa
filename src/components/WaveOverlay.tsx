export default function WaveOverlay() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none h-[38%] overflow-hidden">
      <svg
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Navy fill */}
        <path
          d="M0,100 L0,42 C55,14 120,70 200,44 C275,20 340,62 400,34 L400,100 Z"
          fill="#0D2B45"
          fillOpacity="0.88"
        />
        {/* Teal secondary accent */}
        <path
          d="M0,100 L0,58 C65,32 140,80 220,56 C295,34 360,70 400,50 L400,100 Z"
          fill="#0FA3A3"
          fillOpacity="0.45"
        />
        {/* Gold curve */}
        <path
          d="M0,42 C55,14 120,70 200,44 C275,20 340,62 400,34"
          fill="none"
          stroke="#D4A017"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
