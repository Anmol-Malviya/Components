"use client";

import { Suspense, useMemo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls, RoundedBox } from "@react-three/drei";

export type Laptop3DProps = {
  accent?: string;
  bodyColor?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  lidAngle?: number;
  screenContent?: ReactNode;
  className?: string;
};

type KeySpec = { id: string; x: number; z: number; width: number };
type PortSpec = { id: string; z: number; width: number; height: number };

const BASE_W = 5.86;
const BASE_D = 3.76;
const BASE_H = 0.3;
const DECK_Y = -0.43;
const BOTTOM_Y = -0.69;
const SIDE_X = BASE_W / 2 + 0.004;
const HINGE_Z = -1.79;

function Aluminum({ color }: { color: string }) {
  return <meshPhysicalMaterial color={color} metalness={0.84} roughness={0.24} clearcoat={0.5} clearcoatRoughness={0.2} />;
}

function DarkMetal({ color = "#17191e" }: { color?: string }) {
  return <meshPhysicalMaterial color={color} metalness={0.62} roughness={0.32} clearcoat={0.24} clearcoatRoughness={0.28} />;
}

function KeyCap({ spec }: { spec: KeySpec }) {
  return (
    <group position={[spec.x, DECK_Y + 0.075, spec.z]}>
      <RoundedBox args={[spec.width, 0.074, 0.255]} radius={0.032} smoothness={3} castShadow>
        <meshPhysicalMaterial color="#111318" roughness={0.48} metalness={0.12} clearcoat={0.25} />
      </RoundedBox>
      <RoundedBox args={[Math.max(0.08, spec.width - 0.055), 0.006, 0.202]} radius={0.026} smoothness={2} position={[0, 0.041, -0.004]}>
        <meshStandardMaterial color="#1b1e24" roughness={0.54} metalness={0.08} />
      </RoundedBox>
    </group>
  );
}

function Keyboard() {
  const keys = useMemo<KeySpec[]>(() => {
    const rows = [
      [0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.42],
      [0.43,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.48],
      [0.51,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.62],
      [0.64,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.28,0.76],
      [0.39,0.39,0.39,1.68,0.39,0.39,0.39,0.39],
    ];
    return rows.flatMap((widths, row) => {
      const gap = 0.058;
      const total = widths.reduce((a,b) => a + b, 0) + gap * (widths.length - 1);
      let cursor = -total / 2;
      return widths.map((width, index) => {
        const x = cursor + width / 2;
        cursor += width + gap;
        return { id: `${row}-${index}`, x, z: -1.02 + row * 0.325, width };
      });
    });
  }, []);

  return (
    <group>
      {keys.map((spec) => <KeyCap key={spec.id} spec={spec} />)}
      <RoundedBox args={[0.31,0.07,0.255]} radius={0.035} smoothness={3} position={[2.04,DECK_Y+0.075,-1.02]} castShadow>
        <meshPhysicalMaterial color="#0c0e12" roughness={0.36} metalness={0.28} clearcoat={0.3} />
      </RoundedBox>
      <mesh position={[2.04,DECK_Y+0.117,-1.02]} rotation={[-Math.PI/2,0,0]}>
        <ringGeometry args={[0.045,0.055,24]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>
      <pointLight position={[0,DECK_Y+0.19,-0.36]} intensity={0.65} color="#4f8cff" distance={2.6} />
    </group>
  );
}

function SpeakerGrill({ side }: { side: -1 | 1 }) {
  const holes = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: side * (2.25 + (i % 2) * 0.075),
    z: -1.14 + Math.floor(i / 2) * 0.11,
  })), [side]);
  return <group>{holes.map(h => <mesh key={h.id} position={[h.x,DECK_Y+0.035,h.z]}><cylinderGeometry args={[0.019,0.019,0.014,10]} /><meshStandardMaterial color="#07080a" roughness={0.86} /></mesh>)}</group>;
}

function PortCavity({ side, port }: { side: -1 | 1; port: PortSpec }) {
  return (
    <group position={[side*SIDE_X,-0.56,port.z]}>
      <RoundedBox args={[0.018,port.height,port.width]} radius={0.018} smoothness={2}>
        <meshStandardMaterial color="#030406" roughness={0.42} metalness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.011,Math.max(0.018,port.height-0.024),Math.max(0.04,port.width-0.055)]} radius={0.012} smoothness={2} position={[side*0.012,0,0]}>
        <meshStandardMaterial color="#11151a" roughness={0.34} metalness={0.46} />
      </RoundedBox>
    </group>
  );
}

function SidePorts() {
  const left: PortSpec[] = [
    {id:"charge",z:-0.78,width:0.27,height:0.085},
    {id:"usb-c",z:-0.28,width:0.31,height:0.075},
    {id:"hdmi",z:0.32,width:0.5,height:0.095},
    {id:"usb-a",z:0.96,width:0.4,height:0.1},
  ];
  const right: PortSpec[] = [
    {id:"usb-a",z:-0.56,width:0.4,height:0.1},
    {id:"usb-c",z:0.05,width:0.31,height:0.075},
    {id:"sd",z:0.65,width:0.42,height:0.05},
  ];
  return (
    <>
      {left.map(p => <PortCavity key={`l-${p.id}`} side={-1} port={p} />)}
      {right.map(p => <PortCavity key={`r-${p.id}`} side={1} port={p} />)}
      <group position={[SIDE_X,-0.56,1.08]} rotation={[0,0,Math.PI/2]}>
        <mesh><cylinderGeometry args={[0.055,0.055,0.025,20]} /><meshStandardMaterial color="#030406" roughness={0.42} /></mesh>
        <mesh position={[0,-0.014,0]}><cylinderGeometry args={[0.035,0.035,0.01,20]} /><meshStandardMaterial color="#11151a" roughness={0.35} metalness={0.35} /></mesh>
      </group>
      <mesh position={[SIDE_X+0.014,-0.56,1.43]}><sphereGeometry args={[0.026,14,14]} /><meshBasicMaterial color="#7c5cff" /></mesh>
    </>
  );
}

function ScrewHead({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x,BOTTOM_Y-0.076,z]}>
      <mesh><cylinderGeometry args={[0.045,0.045,0.015,20]} /><meshStandardMaterial color="#17191d" roughness={0.42} metalness={0.75} /></mesh>
      <mesh position={[0,-0.009,0]}><boxGeometry args={[0.052,0.008,0.009]} /><meshStandardMaterial color="#050609" roughness={0.55} /></mesh>
    </group>
  );
}

function VentBank({ z }: { z: number }) {
  return <group>{Array.from({length:19},(_,i)=><RoundedBox key={i} args={[0.13,0.015,0.055]} radius={0.018} smoothness={2} position={[-1.8+i*0.2,BOTTOM_Y-0.082,z]}><meshStandardMaterial color="#07080b" roughness={0.78} /></RoundedBox>)}</group>;
}

function RubberFoot({ x, z }: { x: number; z: number }) {
  return <RoundedBox args={[0.62,0.065,0.16]} radius={0.065} smoothness={4} position={[x,BOTTOM_Y-0.115,z]} castShadow><meshStandardMaterial color="#090a0c" roughness={0.9} /></RoundedBox>;
}

function BottomAssembly({ bodyColor }: { bodyColor: string }) {
  const screws = [[-2.45,-1.45],[0,-1.5],[2.45,-1.45],[-2.5,0],[2.5,0],[-2.45,1.45],[0,1.5],[2.45,1.45]];
  return (
    <group>
      <RoundedBox args={[5.64,0.115,3.54]} radius={0.13} smoothness={5} position={[0,BOTTOM_Y,0]} castShadow>
        <meshPhysicalMaterial color={bodyColor} metalness={0.78} roughness={0.3} clearcoat={0.3} />
      </RoundedBox>
      <RoundedBox args={[5.47,0.012,3.37]} radius={0.1} smoothness={4} position={[0,BOTTOM_Y-0.065,0]}>
        <meshStandardMaterial color="#3b3f47" roughness={0.42} metalness={0.6} />
      </RoundedBox>
      <VentBank z={-0.5} /><VentBank z={-0.68} />
      {screws.map(([x,z],i)=><ScrewHead key={i} x={x} z={z} />)}
      <RubberFoot x={-2.15} z={-1.34} /><RubberFoot x={2.15} z={-1.34} /><RubberFoot x={-2.15} z={1.34} /><RubberFoot x={2.15} z={1.34} />
    </group>
  );
}

function Trackpad() {
  return (
    <group position={[0,DECK_Y+0.027,1.21]}>
      <RoundedBox args={[2.25,0.018,0.92]} radius={0.07} smoothness={4} receiveShadow><meshPhysicalMaterial color="#5d626b" roughness={0.34} metalness={0.42} clearcoat={0.42} /></RoundedBox>
      <RoundedBox args={[2.1,0.004,0.78]} radius={0.055} smoothness={3} position={[0,0.012,0]}><meshStandardMaterial color="#6a6f77" roughness={0.48} metalness={0.2} /></RoundedBox>
    </group>
  );
}

function PalmRest({ bodyColor }: { bodyColor: string }) {
  return <RoundedBox args={[5.58,0.024,3.45]} radius={0.11} smoothness={4} position={[0,DECK_Y,0.04]}><meshPhysicalMaterial color={bodyColor} roughness={0.31} metalness={0.76} clearcoat={0.34} /></RoundedBox>;
}

function KeyboardWell() {
  return <RoundedBox args={[4.34,0.034,2.15]} radius={0.065} smoothness={4} position={[0,DECK_Y+0.026,-0.25]} receiveShadow><meshStandardMaterial color="#202329" roughness={0.5} metalness={0.32} /></RoundedBox>;
}

function FrontNotch() {
  return (
    <group position={[0,-0.48,1.88]}>
      <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.31,0.31,0.06,36,1,false,0,Math.PI]} /><meshStandardMaterial color="#23262c" roughness={0.42} metalness={0.55} /></mesh>
      <RoundedBox args={[0.78,0.025,0.035]} radius={0.012} smoothness={2} position={[0,0.035,0]}><meshStandardMaterial color="#15171c" roughness={0.45} metalness={0.52} /></RoundedBox>
    </group>
  );
}

function RearExhaust() {
  return <group>{Array.from({length:28},(_,i)=><RoundedBox key={i} args={[0.09,0.026,0.07]} radius={0.014} smoothness={2} position={[-2.15+i*0.16,-0.5,HINGE_Z+0.08]}><meshStandardMaterial color="#07080b" roughness={0.8} /></RoundedBox>)}</group>;
}

function HingeBarrel({ x }: { x: number }) {
  return (
    <group position={[x,-0.42,HINGE_Z]} rotation={[0,0,Math.PI/2]}>
      <mesh castShadow><cylinderGeometry args={[0.105,0.105,0.78,30]} /><meshPhysicalMaterial color="#111318" roughness={0.22} metalness={0.94} clearcoat={0.34} /></mesh>
      <mesh position={[0,0.4,0]}><cylinderGeometry args={[0.075,0.075,0.04,24]} /><meshStandardMaterial color="#06070a" roughness={0.35} metalness={0.72} /></mesh>
      <mesh position={[0,-0.4,0]}><cylinderGeometry args={[0.075,0.075,0.04,24]} /><meshStandardMaterial color="#06070a" roughness={0.35} metalness={0.72} /></mesh>
    </group>
  );
}

function HingeAssembly() {
  return (
    <group>
      <HingeBarrel x={-1.72} /><HingeBarrel x={1.72} />
      <RoundedBox args={[2.45,0.13,0.16]} radius={0.055} smoothness={3} position={[0,-0.42,HINGE_Z]}><DarkMetal color="#16191f" /></RoundedBox>
      <RearExhaust />
    </group>
  );
}

function DefaultScreen({ accent }: { accent: string }) {
  return (
    <div style={{width:520,height:310,position:"relative",overflow:"hidden",borderRadius:12,color:"white",fontFamily:"Inter,ui-sans-serif,system-ui,sans-serif",background:"linear-gradient(145deg,#05060a 0%,#0a0915 52%,#05070d 100%)",boxShadow:"inset 0 0 0 1px rgba(255,255,255,.055)"}}>
      <div style={{position:"absolute",width:250,height:250,right:-35,top:-85,borderRadius:999,background:accent,filter:"blur(55px)",opacity:.5}} />
      <div style={{position:"absolute",width:190,height:190,left:-60,bottom:-95,borderRadius:999,background:"#2563eb",filter:"blur(55px)",opacity:.28}} />
      <div style={{position:"relative",zIndex:3,height:40,display:"flex",alignItems:"center",padding:"0 16px",borderBottom:"1px solid rgba(255,255,255,.07)",background:"rgba(255,255,255,.012)"}}>
        <div style={{display:"flex",gap:6}}>{["#ff6b6b","#ffd166","#5ee7a0"].map(c=><span key={c} style={{width:7,height:7,borderRadius:99,background:c,opacity:.78}} />)}</div>
        <span style={{marginLeft:"auto",fontSize:7,letterSpacing:".16em",opacity:.44}}>ANMOL / COMPONENT LAB</span>
      </div>
      <div style={{position:"relative",zIndex:2,display:"grid",gridTemplateColumns:"112px 1fr",height:270}}>
        <aside style={{padding:"18px 13px",borderRight:"1px solid rgba(255,255,255,.06)",background:"rgba(255,255,255,.01)"}}>
          <div style={{width:27,height:27,borderRadius:9,background:accent,boxShadow:`0 0 24px ${accent}44`}} />
          <div style={{marginTop:22,display:"grid",gap:10}}>{[72,56,66,47].map((w,i)=><span key={i} style={{width:w,height:6,borderRadius:99,background:i===0?"rgba(255,255,255,.48)":"rgba(255,255,255,.11)"}} />)}</div>
        </aside>
        <main style={{padding:"24px 25px"}}>
          <div style={{fontSize:8,fontWeight:800,letterSpacing:".18em",opacity:.48}}>INTERACTIVE / THREE.JS</div>
          <div style={{marginTop:8,fontSize:39,lineHeight:.98,fontWeight:820,letterSpacing:"-.055em"}}>3D Laptop</div>
          <div style={{marginTop:10,maxWidth:250,fontSize:9,lineHeight:1.55,opacity:.5}}>Thin aluminium chassis, realistic hinge, modeled ports, vents and layered hardware.</div>
          <div style={{display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:10,marginTop:18}}>
            <div style={{height:64,padding:11,border:"1px solid rgba(255,255,255,.08)",borderRadius:12,background:"rgba(255,255,255,.03)"}}><span style={{display:"block",fontSize:7,opacity:.42}}>RENDER QUALITY</span><strong style={{display:"block",marginTop:7,fontSize:20}}>Ultra</strong></div>
            <div style={{height:64,padding:11,border:`1px solid ${accent}55`,borderRadius:12,background:`${accent}13`}}><span style={{display:"block",fontSize:7,opacity:.46}}>STATUS</span><strong style={{display:"block",marginTop:7,fontSize:17}}>● Live</strong></div>
          </div>
        </main>
      </div>
    </div>
  );
}

function RearLogo({ accent }: { accent: string }) {
  return (
    <group position={[0,1.66,-0.102]} rotation={[0,Math.PI,0]}>
      <mesh><circleGeometry args={[0.33,42]} /><meshPhysicalMaterial color="#343841" metalness={0.86} roughness={0.26} clearcoat={0.46} /></mesh>
      <mesh position={[0,0,-0.006]}><ringGeometry args={[0.205,0.235,42]} /><meshBasicMaterial color={accent} transparent opacity={0.42} /></mesh>
    </group>
  );
}

function WebcamArray({ accent }: { accent: string }) {
  return (
    <group position={[0,3.11,0.148]}>
      <mesh><sphereGeometry args={[0.043,18,18]} /><meshPhysicalMaterial color="#05070b" roughness={0.12} metalness={0.24} clearcoat={1} /></mesh>
      <mesh position={[0.11,0,0.003]}><sphereGeometry args={[0.011,12,12]} /><meshBasicMaterial color={accent} /></mesh>
      {[-0.14,0.14].map(x=><mesh key={x} position={[x,0,0.001]}><sphereGeometry args={[0.011,12,12]} /><meshStandardMaterial color="#10131a" roughness={0.35} /></mesh>)}
    </group>
  );
}

function DisplayAssembly({ accent, bodyColor, screenContent, lidAngle }: { accent:string; bodyColor:string; screenContent?:ReactNode; lidAngle:number }) {
  const angle = Math.max(5,Math.min(145,lidAngle));
  const rotationX = Math.PI/2 - angle*Math.PI/180;
  return (
    <group position={[0,-0.39,HINGE_Z]} rotation={[rotationX,0,0]}>
      <RoundedBox args={[5.4,3.38,0.16]} radius={0.15} smoothness={6} position={[0,1.64,0]} castShadow><Aluminum color={bodyColor} /></RoundedBox>
      <RearLogo accent={accent} />
      <RoundedBox args={[5.12,3.1,0.045]} radius={0.105} smoothness={5} position={[0,1.64,0.11]}><meshPhysicalMaterial color="#030407" roughness={0.08} metalness={0.16} clearcoat={1} clearcoatRoughness={0.07} /></RoundedBox>
      <Html transform center occlude position={[0,1.61,0.145]} distanceFactor={3.56} zIndexRange={[4,0]} style={{pointerEvents:"none",backfaceVisibility:"hidden"}}>
        <div style={{width:520,height:310,overflow:"hidden",borderRadius:12,background:"#05060a",transform:"translateZ(0)",backfaceVisibility:"hidden"}}>{screenContent ?? <DefaultScreen accent={accent} />}</div>
      </Html>
      <WebcamArray accent={accent} />
      <RoundedBox args={[4.72,0.04,0.025]} radius={0.012} smoothness={2} position={[0,0.095,0.13]}><meshStandardMaterial color="#111319" roughness={0.45} metalness={0.42} /></RoundedBox>
    </group>
  );
}

function BaseAssembly({ bodyColor }: { bodyColor: string }) {
  return (
    <group>
      <RoundedBox args={[BASE_W,BASE_H,BASE_D]} radius={0.145} smoothness={6} position={[0,-0.58,0]} castShadow receiveShadow><Aluminum color={bodyColor} /></RoundedBox>
      <PalmRest bodyColor={bodyColor} /><KeyboardWell /><Keyboard /><SpeakerGrill side={-1} /><SpeakerGrill side={1} /><Trackpad /><FrontNotch /><SidePorts /><BottomAssembly bodyColor={bodyColor} /><HingeAssembly />
    </group>
  );
}

function LaptopModel({ accent, bodyColor, screenContent, lidAngle }: { accent:string; bodyColor:string; screenContent?:ReactNode; lidAngle:number }) {
  return <group rotation={[0,-0.12,0]} position={[0,-0.02,0]}><BaseAssembly bodyColor={bodyColor} /><DisplayAssembly accent={accent} bodyColor={bodyColor} screenContent={screenContent} lidAngle={lidAngle} /></group>;
}

export function Laptop3D({ accent="#8b5cf6", bodyColor="#5b6069", autoRotate=true, autoRotateSpeed=0.42, lidAngle=105, screenContent, className="" }: Laptop3DProps) {
  return (
    <div className={className} style={{width:"100%",height:"100%",minHeight:320}}>
      <Canvas dpr={[1,1.65]} shadows camera={{position:[6.85,3.85,7.8],fov:30,near:0.1,far:100}} gl={{antialias:true,alpha:true}}>
        <hemisphereLight args={["#eef2ff","#090a10",1.45]} />
        <ambientLight intensity={0.34} />
        <directionalLight position={[4.8,7.4,5.5]} intensity={3.05} castShadow />
        <spotLight position={[-5.2,6.4,4.6]} intensity={34} angle={0.38} penumbra={0.86} color="#ffffff" />
        <pointLight position={[-4.4,1.8,3.7]} intensity={14} color={accent} distance={11} />
        <pointLight position={[4.2,1.7,-2.6]} intensity={9} color="#4f8cff" distance={10} />
        <Suspense fallback={null}>
          <LaptopModel accent={accent} bodyColor={bodyColor} screenContent={screenContent} lidAngle={lidAngle} />
          <ContactShadows position={[0,-0.94,0]} opacity={0.62} scale={8.8} blur={2.45} far={5.5} />
        </Suspense>
        <OrbitControls makeDefault enablePan={false} enableDamping dampingFactor={0.06} minDistance={6.7} maxDistance={11.2} minPolarAngle={0.24} maxPolarAngle={2.78} autoRotate={autoRotate} autoRotateSpeed={autoRotateSpeed} target={[0,0.42,-0.18]} />
      </Canvas>
    </div>
  );
}

export default Laptop3D;
