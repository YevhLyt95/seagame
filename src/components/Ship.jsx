import { useRef, useEffect } from 'react'; 
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getWaveHeight } from '../../utils/ocean';

export function Ship() {
    const meshRef = useRef();
    // Instead of useState is useRef for immediate access
    const keysRef = useRef({}); 

    useEffect(() => {
        const handleKeyDown = (e) => {
            keysRef.current = { ...keysRef.current, [e.key.toLowerCase()]: true };
        };
        const handleKeyUp = (e) => {
            keysRef.current = { ...keysRef.current, [e.key.toLowerCase()]: false };
        };
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, []); // useEffect now settings listeners one time

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // read actual state from keysRef.current
        const keys = keysRef.current; 

        const speed = 5 * delta; 
        const rotationSpeed = 2 * delta;

        if (keys['w']) meshRef.current.translateZ(speed);
        if (keys['s']) meshRef.current.translateZ(-speed);
        if (keys['a']) meshRef.current.rotation.y += rotationSpeed;
        if (keys['d']) meshRef.current.rotation.y -= rotationSpeed;

        const {x, z} = meshRef.current.position;
        meshRef.current.position.y = getWaveHeight(x, z, t) - 0.2;

        // update matrix after movement
        meshRef.current.updateMatrixWorld(); 

        // camera
        const relativeCameraOffset = new THREE.Vector3(0, 5, -10);
        const cameraOffset = relativeCameraOffset.applyMatrix4(meshRef.current.matrixWorld);
        state.camera.position.lerp(cameraOffset, 0.1);
        state.camera.lookAt(meshRef.current.position);
    });

    return (
        <mesh ref={meshRef} position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[1, 1, 2]} />
            <meshStandardMaterial color="brown" />
        </mesh>
    );
}
