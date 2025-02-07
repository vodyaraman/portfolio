import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FloatingIce = ({ x, y }: { x: number; y: number }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  // Генерация градиентной текстуры
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 256)
      gradient.addColorStop(0, '#ffffff')
      gradient.addColorStop(1, '#aad4e5')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 256, 256)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // Создание геометрии
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const radius = 2
    const angle = Math.PI / 3 // 60 градусов в радианах

    // Начинаем с верхней точки (0, radius)
    shape.moveTo(radius * Math.cos(0), radius * Math.sin(0))

    // Создаём 6 вершин шестиугольника
    for (let i = 1; i <= 6; i++) {
      const theta = angle * i - Math.PI / 6 // Поворачиваем на 30 градусов для ориентации
      const x = radius * Math.cos(theta)
      const y = radius * Math.sin(theta)
      shape.lineTo(x, y)
    }

    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 2
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  // Создание материалов
  const materials = useMemo(() => {
    const mainMaterial = new THREE.MeshPhongMaterial({
      map: gradientTexture,
      transparent: true,
      opacity: 0.99,
      emissive: 0x4466aa,
      emissiveIntensity: 0.3,
      shininess: 80,
      specular: 0xffffff,
      side: THREE.DoubleSide
    })

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xaad4e5,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })

    return [mainMaterial, glowMaterial]
  }, [gradientTexture])

  // Анимация
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
      meshRef.current.position.y = y + Math.sin(clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={materials[0]} // Используем только основной материал
      position={[x, y, -7.5]}
      scale={[2.5, 2.5, 1.8]}
      rotation={[1.57, 0, Math.PI / 6]}
    />
  )
}

export default FloatingIce