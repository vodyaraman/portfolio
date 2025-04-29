import { Center, Text3D } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface H1IntroProps {
  text: string;
  positionY: number;
  fontPath?: string;
  fontSize?: number;
}

const H1Intro = ({
  text,
  positionY,
  fontSize,
  fontPath = '/fonts/Guerrilla/Protest_Guerrilla_Regular.typeface.json',
}: H1IntroProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Center disableY={true}>
      <Text3D
        ref={meshRef}
        font={fontPath}
        size={fontSize}
        height={0.5}
        letterSpacing={-0.025}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        position={[0, positionY - 1, 0]}
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