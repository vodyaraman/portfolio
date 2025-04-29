import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function LogoModel() {
    const { scene } = useGLTF('/models/Logo.glb')
    const ref = useRef<THREE.Object3D>(scene)
    const [targetRotation, setTargetRotation] = useState(0)
    const rotationSpeed = Math.PI / 2 // 180° за 2 секунды

    useEffect(() => {
        const interval = setInterval(() => {
            setTargetRotation(prev => prev + Math.PI)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    useFrame((_, delta) => {
        if (ref.current) {
            const currentY = ref.current.rotation.y
            const diff = targetRotation - currentY
            if (Math.abs(diff) > 0.001) {
                ref.current.rotation.y += diff * delta * 2 // сглаживание за 2 секунды
            } else {
                ref.current.rotation.y = targetRotation
            }
        }
    })

    return <primitive object={scene} ref={ref} />
}


export default function LogoScene() {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
                <Stage
                    environment="city"
                    intensity={2}
                    shadows={false}
                >
                    <LogoModel/>
                </Stage>

            </Suspense>
        </Canvas>
    )
}
