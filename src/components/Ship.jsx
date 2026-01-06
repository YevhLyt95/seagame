import {useRef, useState, useEffect} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

export function Ship() {
    const meshRef = useRef();
    const [keys, setKeys] = useState({});

    //key tapping check

    useEffect(() => {
        const handleKeyDown = (e) => setKeys(prev => ({...prev, [e.key.toLowerCase()]: true}));
        const handleKeyUp = (e) => setKeys(prev => ({...prev, [e.key.toLowerCase()]: false}));
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const speed = 5 * delta;
        const rotationSpeed = 2 * delta;

        if (keys['w']) meshRef.current.translateZ(speed);
        if (keys['s']) meshRef.current.translateZ(-speed);
        if (keys['a']) meshRef.current.rotation.y += rotationSpeed;
        if (keys['d']) meshRef.current.rotation.y -= rotationSpeed;

        const relativeCameraOffset = new THREE.Vector3(0, 5, -10);
        const cameraOffset = relativeCameraOffset.applyMatrix4(meshRef.current.matrixWorld);
        state.camera.position.lerp(cameraOffset, 0.1);
    });

    return (
        <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 2]} /> {/* Our placeholder for sheep */}
        <meshStandardMaterial color="brown" />
        </mesh>
    )
}