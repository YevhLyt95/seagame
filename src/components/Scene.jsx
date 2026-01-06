import { Sky, ContactShadows } from '@react-three/drei'
import { Ship } from './Ship'
import { Island } from './Island'

export function Scene() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
      />

      <Ship />

      {/* Puting islands */}
      <Island position={[10, 0, 10]} color="palegoldenrod" />
      <Island position={[-15, 0, -20]} scale={[2, 1, 2]} color="sandybrown" />
      <Island position={[20, 0, -10]} scale={[1.5, 1, 1.5]} color="olive" />

      {/* Ocean */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#0077be" />
      </mesh>
    </>
  )
}
