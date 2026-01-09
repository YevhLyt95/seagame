import { useRef, useEffect } from 'react'; 
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {useGLTF} from '@react-three/drei';
import { getWaveHeight } from '../../utils/ocean';

export function Ship() {
    const meshRef = useRef();
    // Instead of useState is useRef for immediate access
    const keysRef = useRef({}); 
    const { scene } = useGLTF('./public/models/ship.glb');
    useEffect(() => {
        //setting up shadows and materials
        scene.traverse((obj) => {
            if( obj.isMesh ) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                if( obj.material ) obj.material.roughness = 0.8;
            }
        })
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
        meshRef.current.position.y = getWaveHeight(x, z, t) + 0.3;

        // update matrix after movement
        meshRef.current.updateMatrixWorld(); 

        // camera
        const relativeCameraOffset = new THREE.Vector3(0, 8, -22);
        const cameraOffset = relativeCameraOffset.applyMatrix4(meshRef.current.matrixWorld);
        state.camera.position.lerp(cameraOffset, 0.1);
        state.camera.lookAt(meshRef.current.position);
    });

    return (
        <primitive
            ref = {meshRef}
            object = {scene}
            scale = {0.15}
            rotation-y = {Math.PI}
        />
    );
}

useGLTF.preload('/models/ship.glb');