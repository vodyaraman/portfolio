import { Center, Text3D } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface H1IntroProps {
  text: string;
  texturePath: string;
  positionY: number;
  fontPath?: string;      // Новый пропс для шрифта
  fontSize?: number;       // Новый пропс для размера текста
  rotationX?: number;      // Новый пропс для угла наклона по оси X
}

const H1Intro = ({
  text,
  texturePath,
  positionY,
  fontPath = '/fonts/Guerrilla/Protest_Guerrilla_Regular.typeface.json', // Значение по умолчанию
  fontSize = 2.5,            // Значение по умолчанию
  rotationX = 0              // По умолчанию нет наклона
}: H1IntroProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const windStrength = 0.3; // Сила ветра
  const windSpeed = 2.0;    // Скорость изменения
  const windOffset = Math.random() * Math.PI; // Разный сдвиг для каждого текста

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(texturePath, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [texturePath]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.PI / 5.5;
      meshRef.current.rotation.x = 0.075;
      meshRef.current.position.y = positionY;
    }
  }, [rotationX, positionY]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      const windEffect = Math.sin(time * windSpeed + windOffset) * windStrength;

      meshRef.current.position.x = windEffect;
      meshRef.current.rotation.z = windEffect * 0.05;
    }
  });

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font={fontPath}       // Использование выбранного шрифта
        size={fontSize}       // Использование выбранного размера текста
        height={0.5}
        letterSpacing={-0.075}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        bevelSegments={5}
        material={[
          new THREE.MeshStandardMaterial({ color: 'alicablue' }),
          new THREE.MeshBasicMaterial({ color: 'black' }),
        ]}
      >
        {text}
      </Text3D>
    </Center>
  );
};

export default H1Intro;
