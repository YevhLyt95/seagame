import React, { useRef, useMemo } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three-stdlib';
import { WAVE_SPEED } from '../../utils/ocean';

// Register water as JSX element (<water />)
extend({ Water });

export function Sea() {
  const meshRef = useRef();
  const gl = useThree((state) => state.gl);
  
  // Get texture normals for water
  const waterNormals = useMemo(
    () => new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg',
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    []
  );

  const sun = new THREE.Vector3();

  // Setting up wather shader
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.outputEncoding, 
    }),
    [waterNormals, gl.outputEncoding]
  );

  //Animation: updating uniform 'time' every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms['time'].value += delta * WAVE_SPEED;
    }
  });

  return (
    <water
      ref={meshRef}
      args={[new THREE.PlaneGeometry(10000, 10000), config]}
      rotation-x={-Math.PI / 2} // Put water horizontally
    />
  );
}