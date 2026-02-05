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
                life: 1,
                v: 0
            });
        }
        return temp;
    }, []);
    const dummy = new THREE.Object3D();

    useFrame((state, delta) => {
        if (!meshRef.current) return;


        particles.forEach((p, i) => {
            p.life += delta * 1.2; //disappearance rate

            if (p.life > 1) {
            //each particle respawn near the back of the ship after its death
                p.life = 0;
                p.x = (Math.random() - 0.5) * 0.6;
                p.y = -0.4; //slightly under the water level
                p.z = 0;
                p.v = 4 + Math.random() * 2;
            }

            //move back from the ship
            p.z -= p.v * delta;
            dummy.position.set(p.x, p.y, p.z);

            const s = Math.sin(p.life * Math.PI) * 1.2;
            dummy.scale.set(s, s, s);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, MAX_PARTICLES]}>
            <sphereGeometry args={[0.3, 4, 4]} /> {/* low poly particles */}
            <meshBasicMaterial color="white" transparent opacity={0.4} />
        </instancedMesh>
    );
}

