import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WindEffect = () => {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 2000
  const windStrength = 0.5
  const turbulence = 0.25

  // Настройки области видимости (подберите под свою камеру)
  const visibleWidth = 45
  const visibleHeight = 30
  const depth = 15

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 2) // [xVel, yVel]
    
    for (let i = 0; i < particleCount; i++) {
      // Равномерное распределение по всей видимой области
      positions[i * 3] = (Math.random() - 0.5) * visibleWidth
      positions[i * 3 + 1] = (Math.random() - 0.5) * visibleHeight
      positions[i * 3 + 2] = Math.random() * depth

      // Начальные скорости с базовым ветром
      velocities[i * 2] = windStrength + (Math.random() - 0.5) * turbulence
      velocities[i * 2 + 1] = -Math.abs(windStrength * 0.3) + (Math.random() - 0.5) * turbulence
    }
    
    return { positions, velocities }
  }, [particleCount])

  useFrame(({ clock }, delta) => {
    if (!particlesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array
    const time = clock.getElapsedTime()

    // Периодические изменения ветра
    const windVariation = Math.sin(time * 0.5) * 0.3
    const turbulenceVariation = Math.cos(time * 0.7) * 0.2

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3
      const velIdx = i * 2

      // Динамическое изменение скорости
      let xVel = velocities[velIdx] + 
        (Math.random() - 0.5) * turbulence * 0.1 +
        windVariation +
        turbulenceVariation

      let yVel = velocities[velIdx + 1] + 
        (Math.random() * turbulence * 0.05) +
        (Math.sin(time + i) * 0.01)

      // Обновление позиций
      positions[idx] += xVel * delta * 15
      positions[idx + 1] += yVel * delta * 15

      // Плавное зацикливание
      if (positions[idx] > visibleWidth/2) {
        positions[idx] = -visibleWidth/2
        positions[idx + 1] = (Math.random() - 0.5) * visibleHeight
      }
      if (positions[idx] < -visibleWidth/2) {
        positions[idx] = visibleWidth/2
        positions[idx + 1] = (Math.random() - 0.5) * visibleHeight
      }
      if (positions[idx + 1] < -visibleHeight/2) {
        positions[idx + 1] = visibleHeight/2
        positions[idx] = (Math.random() - 0.5) * visibleWidth
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="white"
        size={0.05}
        opacity={0.5}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default WindEffect
