import React, {useRef, useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

//number of bubbles in footprint on the water
const MAX_PARTICLES = 40;
export function Wake ({shipRef}) {
    const meshRef = useRef();

    //array for particles(position and lifetime)
    const particles = useMemo(() => {
        const temp = [];
            for (let i = 0; i < MAX_PARTICLES; i++) {
                temp.push({
                x: 0, y: 0, z: 0,
                life: Math.random(),
                size: Math.random() * 0.5
            });
        }
        return temp;
    }, []);
    const dummy = new THREE.Object3D();

    useFrame((state, delta) => {
        if (!shipRef.current || !meshRef.current) return;

        const shipPos = new THREE.Vector3();
        shipRef.current.getWorldPosition(shipPos);

        //getting ship direction
        const shipQuaternion = new THREE.Quaternion();
        shipRef.current.getWorldQuaternion(shipQuaternion);
        const backDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(shipQuaternion);

        particles.forEach((p, i) => {
            p.life += delta * 0.6; //disappearance rate

            if (p.life > 1) {
            //each particle respawn near the back of the ship after its death
                p.life = 0;
                p.x = shipPos.x + backDirection.x * 2 + (Math.random() - 0.5) * 0.8;
                p.y = shipPos.Pos.y - 0.2; //slightly under the water level
                p.z = shipPos.z + backDirection.z * 2 + (Math.random() - 0.5) * 0.8;
                p.size = 0.1;
            }

            //particle gets bigger and go upwards

            const scale = p.life * 2;
            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, MAX_PARTICLES]}>
            <sphereGeometry args={[0.3, 4, 4]} /> {/* Лоу-полі кульки */}
            <meshBasicMaterial color="white" transparent opacity={0.4} />
        </instancedMesh>
    );
}

