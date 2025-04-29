import { Center, Text3D } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface H1IntroProps {
  text: string;
  texturePath: string;
  positionY: number;
  fontPath?: string;
  fontSize?: number;
  rotationX?: number;
}

const H1Intro = ({
  text,
  texturePath,
  positionY,
  fontPath = '/fonts/Guerrilla/Protest_Guerrilla_Regular.typeface.json',
  fontSize = 2.5,
  rotationX = 0
}: H1IntroProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  const [adaptiveFontSize, setAdaptiveFontSize] = useState(fontSize);
  const [adaptivePositionY, setAdaptivePositionY] = useState(positionY);
  const [adaptivePositionX, setAdaptivePositionX] = useState(0);

  const windStrength = 0.1;
  const windSpeed = 1.0;
  const windOffset = Math.random() * Math.PI;

  // Загрузка текстуры один раз
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(texturePath, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [texturePath]);

  // Обновляем адаптивные значения только при реальном ресайзе окна
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setAdaptiveFontSize(isMobile ? fontSize! * 0.75 : fontSize!);
      setAdaptivePositionY(isMobile ? positionY * 0.75 : positionY);
      setAdaptivePositionX(isMobile ? 1 : 0);
    };

    handleResize(); // Инициализация при первом рендере
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fontSize, positionY]);

  // Устанавливаем изначальные параметры
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotationX;
      meshRef.current.rotation.y = 0;
    }
  }, [rotationX]);

  // Управляем ветром отдельно
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      const windEffect = Math.sin(time * windSpeed + windOffset) * windStrength;

      meshRef.current.position.set(
        adaptivePositionX + windEffect,
        adaptivePositionY,
        0
      );
      meshRef.current.rotation.z = windEffect * 0.05;
    }
  });

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font={fontPath}
        size={adaptiveFontSize}
        height={0.5}
        letterSpacing={-0.025}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        bevelSegments={5}
        material={[
          new THREE.MeshStandardMaterial({ color: 'white' }),
          new THREE.MeshBasicMaterial({ color: 'black' }),
        ]}
      >
        {text}
      </Text3D>
    </Center>
  );
};

export default H1Intro;
