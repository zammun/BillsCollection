import { useRef } from 'react';

// ==========================================
// ANCIENT OLIVE ENGRAVING PALETTE
// ==========================================

const Ink = "#1a2415"; // Very dark olive/black ink
const OliveStem = "#5d6b38"; // Mid-tone olive drab
const PaleOlive = "#c5cba9"; // Yellow-green sage/olive fill
const RipeOlive = "#262223"; // Dark purple/black ripe olive
const Paper = "#f3f2e7"; // Warm yellowish parchment background

// ==========================================
// DETAILED BOTANICAL VECTORS
// ==========================================

const OliveLeaf = ({ x, y, scale = 1, rotation = 0, flip = false }: { x: number; y: number; scale?: number; rotation?: number; flip?: boolean }) => {
  const dir = flip ? -1 : 1;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      <path 
        d={`M 0,0 C ${-15 * dir},-20 ${-25 * dir},-50 0,-75 C ${20 * dir},-45 ${12 * dir},-20 0,0 Z`} 
        fill={PaleOlive} 
        stroke={Ink} 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
      <path 
        d={`M 0,0 C ${-15 * dir},-20 ${-25 * dir},-50 0,-75 Q 0,-30 0,0 Z`} 
        fill={OliveStem} 
        opacity="0.3"
      />
      <path 
        d="M 0,0 Q 0,-35 0,-72" 
        stroke={Ink} 
        strokeWidth="1.5" 
        fill="none" 
        strokeLinecap="round"
      />
      <path d={`M 0,-15 Q ${-5 * dir},-20 ${-8 * dir},-25 M 0,-15 Q ${5 * dir},-20 ${8 * dir},-25`} stroke={Ink} strokeWidth="1" fill="none" />
      <path d={`M 0,-35 Q ${-7 * dir},-40 ${-11 * dir},-45 M 0,-35 Q ${7 * dir},-40 ${11 * dir},-45`} stroke={Ink} strokeWidth="1" fill="none" />
      <path d={`M 0,-55 Q ${-5 * dir},-60 ${-8 * dir},-63 M 0,-55 Q ${5 * dir},-60 ${8 * dir},-63`} stroke={Ink} strokeWidth="1" fill="none" />
    </g>
  );
};

const Olive = ({ x, y, scale = 1, rotation = 0, isRipe = false }: { x: number; y: number; scale?: number; rotation?: number, isRipe?: boolean }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0,0 Q -3,-10 0,-18" stroke={Ink} strokeWidth="1.5" fill="none" />
    <ellipse cx="0" cy="-30" rx="8" ry="12" fill={isRipe ? RipeOlive : PaleOlive} stroke={Ink} strokeWidth="1.5" />
    <path d="M -4,-38 A 5,8 0 0,0 -4,-22" stroke={isRipe ? Paper : Ink} strokeWidth="1" fill="none" opacity={isRipe ? 0.7 : 0.4} />
    <path d="M -1,-42 L 1,-42 M 0,-43 L 0,-41" stroke={Ink} strokeWidth="0.75" fill="none" strokeLinecap="round" />
  </g>
);

const DamaskTile = ({ yOffset }: { yOffset: number }) => (
  <g transform={`translate(0, ${yOffset})`}>
    
    {/* ========================================== */}
    {/* 1. STRUCTURAL VINES & SCROLLWORK           */}
    {/* ========================================== */}
    
    <path d="M 50,0 C 140,110 10,90 110,200 C 10,310 140,290 50,400" stroke={OliveStem} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 90,0 C 10,130 150,70 70,200 C 150,330 10,270 90,400" stroke={Ink} strokeWidth="1" fill="none" strokeLinecap="round" />

    {/* Tendrils rooted securely to background vines */}
    <path d="M 110,200 C 150,220 150,160 120,160 C 110,160 110,180 120,180" stroke={Ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M 70,200 C 30,180 30,240 60,240 C 70,240 70,220 60,220" stroke={Ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />

    {/* ========================================== */}
    {/* 2. MAIN THICK TRUNK & ENGRAVING SHADING    */}
    {/* ========================================== */}
    
    <path d="M 30,0 C 30,150 130,50 130,200 C 130,350 30,250 30,400" stroke={Ink} strokeWidth="4.5" fill="none" strokeLinecap="round" />
    <path d="M 34,0 C 34,145 126,55 126,200 C 126,345 34,255 34,400" stroke={Ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 37,0 C 37,140 123,60 123,200 C 123,340 37,260 37,400" stroke={Ink} strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.8" />

    {/* ========================================== */}
    {/* 3. 100% CONNECTED BRANCH STEMS             */}
    {/* ========================================== */}
    
    <path d="M 95,90 Q 120,75 135,100" stroke={Ink} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 130,200 Q 145,175 155,190" stroke={Ink} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 75,200 Q 50,195 35,225" stroke={Ink} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 60,310 Q 40,295 25,320" stroke={Ink} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 120,310 Q 140,325 150,300" stroke={Ink} strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* ========================================== */}
    {/* 4. LEAVES & FRUIT (Anchored to exact tips) */}
    {/* ========================================== */}
    
    <OliveLeaf x={135} y={100} scale={0.8} rotation={40} />
    <OliveLeaf x={135} y={100} scale={0.65} rotation={90} flip />
    <Olive x={135} y={100} scale={0.9} rotation={15} isRipe={true} />

    <OliveLeaf x={155} y={190} scale={0.75} rotation={20} />
    <OliveLeaf x={155} y={190} scale={0.6} rotation={75} flip />
    <Olive x={155} y={190} scale={0.85} rotation={-20} isRipe={false} />

    <OliveLeaf x={35} y={225} scale={0.85} rotation={-45} />
    <OliveLeaf x={35} y={225} scale={0.7} rotation={-95} flip />
    <Olive x={35} y={225} scale={1} rotation={-30} isRipe={true} />

    <OliveLeaf x={25} y={320} scale={0.9} rotation={-50} />
    <OliveLeaf x={25} y={320} scale={0.75} rotation={-10} flip />
    <Olive x={25} y={320} scale={1.1} rotation={-35} isRipe={false} />

    <OliveLeaf x={150} y={300} scale={0.8} rotation={35} />
    <OliveLeaf x={150} y={300} scale={0.65} rotation={80} flip />
    <Olive x={150} y={300} scale={0.95} rotation={10} isRipe={true} />

  </g>
);

// ==========================================
// MAIN BACKGROUND COMPONENT
// ==========================================

const PlantTest = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiles = Array.from({ length: 12 }); // Enough vertical length to tile across full page scrolls
  const tileHeight = 400;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f3f2e7]">
      
      {/* NOISE OVERLAY FOR PARCHMENT TEXTURE */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* STATIC ENGRAVED MARGINS */}
      <div className="absolute inset-0 z-0 flex justify-between px-0 md:px-2 lg:px-8">
        
        {/* LEFT MARGIN */}
        <div className="w-32 sm:w-48 md:w-64 h-full relative flex items-start">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 160 ${tiles.length * tileHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin slice">
            {tiles.map((_, i) => (
              <DamaskTile key={`left-${i}`} yOffset={i * tileHeight} />
            ))}
          </svg>
        </div>

        {/* RIGHT MARGIN (Mirrored via CSS scale-x-[-1]) */}
        <div className="w-32 sm:w-48 md:w-64 h-full relative flex items-start scale-x-[-1]">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 160 ${tiles.length * tileHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin slice">
            {tiles.map((_, i) => (
              <DamaskTile key={`right-${i}`} yOffset={i * tileHeight} />
            ))}
          </svg>
        </div>

      </div>
    </div>
  );
};

export default PlantTest;