import React, { useEffect, useRef, forwardRef } from 'react'; 
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { getWaveHeight } from '../../utils/ocean';
import { Wake } from './Wake';

export const Ship = forwardRef((props, ref) => {
    //create ref just for ship model
    const boarModelRef = useRef();
    const keysRef = useRef({});
    const { scene } = useGLTF ('/models/ship.glb');


    useEffect(() => {
        if (scene) {
            scene.traverse((obj) => {
                if (obj.isMesh) {
                    obj.castShadow = true;
                    obj.receiveShadow = true;
                    if (obj.material) obj.material.roughness = 0.8;
                }
            });
        }

        const handleKeyDown = (e) => {
            keysRef.current[e.key.toLowerCase()] = true;
        };
        const handleKeyUp = (e) => {
            keysRef.current[e.key.toLowerCase()] = false;
        };
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [scene]);

    useFrame((state, delta) => {
        // If ref has not yet been attached to the primitive or the model is not loaded - exit
        if (!ref || !ref.current) return;
        
        const t = state.clock.getElapsedTime();
        const keys = keysRef.current; 

        const speed = 5 * delta; 
        const rotationSpeed = 2 * delta;

        // Рух
        if (keys['w']) ref.current.translateZ(speed);
        if (keys['s']) ref.current.translateZ(-speed);
        if (keys['a']) ref.current.rotation.y += rotationSpeed;
        if (keys['d']) ref.current.rotation.y -= rotationSpeed;

        
        const { x, z } = ref.current.position;
        ref.current.position.y = getWaveHeight(x, z, t) + 0.3;

   
        ref.current.updateMatrixWorld(); 

       
        const relativeCameraOffset = new THREE.Vector3(0, 2, -10);
        const cameraOffset = relativeCameraOffset.applyMatrix4(ref.current.matrixWorld);
        state.camera.position.lerp(cameraOffset, 0.1);
        state.camera.lookAt(ref.current.position.x, ref.current.position.y + 2, ref.current.position.z);
    });
    // wrapping ship with Wake in one group to synchronize them
    return (
        <group ref = {ref}>
            <primitive
                object = {scene}
                scale = {0.15}
                rotation-y = {0}
            />
            <Wake />
        </group>
    );
});

Ship.displayName = 'Ship';


useGLTF.preload('/models/ship.glb');