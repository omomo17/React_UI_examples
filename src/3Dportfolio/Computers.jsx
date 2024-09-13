import React from 'react'
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

const Computers = () => {
    // const computer = useGLTF("./assets/scene.gltf");

    return (
        <>
        <h1>sphere</h1>
            <mesh></mesh>
        </>
    )
}

export default Computers
