import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'

function LogoModel() {
    const { scene } = useGLTF('/models/Logo.glb')
    const ref = useRef<THREE.Object3D>(scene)
    const [flip, setFlip] = useState(false)
    const lastFlip = useRef(Date.now())

    useFrame((_, delta) => {
        const now = Date.now()
        if (now - lastFlip.current > 5000) {
            setFlip(prev => !prev)
            lastFlip.current = now
        }
    
        if (ref.current) {
            const targetY = flip ? Math.PI : 0
            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, delta * 2)
        }
    })    

    return <primitive object={scene} ref={ref} />
}

export default function LogoScene() {
    return (
        <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }}>
            <ambientLight intensity={0.3} />
            <directionalLight
                castShadow
                intensity={4}
                position={[2, -5, 3]}
            />

            <Suspense fallback={null}>
                <LogoModel />
            </Suspense>
        </Canvas>
    )
}
