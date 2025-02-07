import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const Flag = ({
  position = [0, 0, 0],
  swingSpeed = 2,
  swingAngle = 0.2,
  flagColor = "red",
  poleColor = "black"
}: {
  position?: [number, number, number]
  swingSpeed?: number
  swingAngle?: number
  flagColor?: string
  poleColor?: string
}) => {
  const flagRef = useRef<THREE.Mesh>(null)
  
  // Создаем треугольную геометрию для флага
  const flagGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      0, 0, 0,   // нижний левый
      1, 0, 0,   // нижний правый
      0.5, 1, 0  // верхний центр
    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setIndex([0, 1, 2])
    geometry.computeVertexNormals()
    return geometry
  }, [])

  useFrame((state) => {
    if (flagRef.current) {
      const time = state.clock.getElapsedTime()
      flagRef.current.rotation.y = Math.sin(time * swingSpeed) * swingAngle + -Math.PI / 6
    }
  })

  return (
    <group position={position}>
      {/* Черный столбик */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3]} />
        <meshStandardMaterial color={poleColor} />
      </mesh>
      
      {/* Красный флажок */}
      <mesh
        ref={flagRef}
        position={[-0.05, 2, 0]} // Смещение относительно столбика
        rotation={[-0.8, 0, 0]} // Поворот для ориентации вдоль столбика
        scale={[0.8, 0.8, 0.8]}
      >
        <primitive object={flagGeometry} />
        <meshStandardMaterial 
          color={flagColor} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default Flag