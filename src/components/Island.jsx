import React from 'react'

export function Island({ position, scale = [1, 1, 1], color = "gold" }) {
  return (
    <group position={position} scale={scale}>
      {/* Sand base */}
      <mesh receiveShadow>
        <cylinderGeometry args={[2, 2.5, 0.2, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Stone */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="slategrey" />
      </mesh>
    </group>
  )
}
