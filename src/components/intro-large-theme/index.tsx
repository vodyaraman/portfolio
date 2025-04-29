import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import H1Intro from './elements/H1Intro.tsx';
import WindEffect from './elements/WindEffect.tsx';

const CameraController = () => {
  const { camera } = useThree();
  const targetRadius = useRef(10);
  const mouseX = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseX.current = normalizedX;
      console.log("Re-render!!!")
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const angle = mouseX.current * Math.PI * 0.01;
    const radius = targetRadius.current;

    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const IntroBackgroundTheme = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 6]} intensity={3} />

      <H1Intro
        text="INTRODUCING"
        positionY={2}
        fontPath="/fonts/Guerrilla/Protest_Guerrilla_Regular.typeface.json"
        fontSize={0.8}
      />

      <H1Intro
        text="SAEVSKII.DEV RESUME/CV"
        positionY={0.7}
        fontPath="/fonts/Oswald/Oswald_Regular.typeface.json"
        fontSize={0.6}
      />
      <CameraController />

      <WindEffect />
    </Canvas>
  );
};

export default IntroBackgroundTheme;
