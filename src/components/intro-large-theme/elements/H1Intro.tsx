import { Center, Text3D } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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
  const windStrength = 0.3;
  const windSpeed = 2.0;
  const windOffset = Math.random() * Math.PI;

  const { size } = useThree();

  // Удаляем статичное определение isMobile
  const getAdaptiveValues = () => {
    const isMobile = size.width < 768;
    return {
      fontSize: isMobile ? fontSize * 0.5 : fontSize,
      positionY: isMobile ? positionY * 0.5 : positionY,
      positionX: isMobile ? 1.1 : 0
    };
  };

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
      // Обновляем только позицию Y
      meshRef.current.position.y = getAdaptiveValues().positionY;
    }
  }, [rotationX, positionY, size.width]); // Добавляем size.width в зависимости

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const { positionX } = getAdaptiveValues();
      const time = clock.getElapsedTime();
      const windEffect = Math.sin(time * windSpeed + windOffset) * windStrength;
      
      // Комбинируем адаптивную позицию и эффект ветра
      meshRef.current.position.x = positionX + windEffect;
      meshRef.current.rotation.z = windEffect * 0.05;
    }
  });

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font={fontPath}
        size={getAdaptiveValues().fontSize}
        height={0.5}
        letterSpacing={-0.075}
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