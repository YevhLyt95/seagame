import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls, ContactShadows } from '@react-three/drei';
import { Ship } from './components/Ship';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <Sky sunPosition={[100, 10, 100]} /> {/* Гарне небо */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Ship />

        {/* Океан - поки що просто синя площина */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#0077be" />
        </mesh>

        <OrbitControls /> {/* Щоб ти міг крутити камеру мишкою */}
        <gridHelper args={[100, 20]} /> {/* Сітка для орієнтації в просторі */}
      </Canvas>
    </div>
  );
}

export default App;