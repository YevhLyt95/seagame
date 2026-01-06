import { Sky } from '@react-three/drei'
import { Ship } from './Ship'
import { Island } from './Island'
import { Sea } from './Sea'

export function Scene() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]} // For better shadows
      />

      {/* Ship and logic */}
      <Ship />

      {/* Islands */}
      <Island position={[10, -0.01, 10]} color="palegoldenrod" />
      <Island position={[-15, -0.01, -20]} scale={[2, 1, 2]} color="sandybrown" />
      <Island position={[20, -0.01, -10]} scale={[1.5, 1, 1.5]} color="olive" />

      <Sea />
      
    </>
  )
}