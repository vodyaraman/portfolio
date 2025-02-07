import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import H1Intro from './elements/H1Intro.tsx';
import WindEffect from './elements/WindEffect.tsx';
import FloatingIce from './elements/FloatingIce.tsx';
import Flag from './elements/Flag.tsx';

const BackgroundTexture = ({ texturePath, backgroundColor }: { texturePath: string; backgroundColor: string }) => {
  const { scene } = useThree();
  const texture = new THREE.TextureLoader().load(texturePath);

  scene.background = new THREE.Color(backgroundColor);

  const planeGeometry = new THREE.PlaneGeometry(100, 100);
  const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.9 });
  const backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);

  backgroundPlane.position.z = -15;
  scene.add(backgroundPlane);

  return null;
};

const CameraController = () => {
  const { camera } = useThree();
  const targetRadius = useRef(10);
  const mouseX = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseX.current = normalizedX;
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
    <Canvas camera={{ position: [0, 2, 10] }}>
      <BackgroundTexture texturePath="/textures/icy-intro.webp" backgroundColor="transparent" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 6]} intensity={3} />

      <H1Intro
        text="Introducing"
        texturePath="/textures/leather.jpg"
        positionY={2}
        fontPath="/fonts/Guerrilla/Protest_Guerrilla_Regular.typeface.json"
      />

      <H1Intro
        text="saevskii.dev showcase!"
        texturePath="/textures/leather.jpg"
        positionY={-1}
        fontPath="/fonts/Oswald/Oswald_Regular.typeface.json"
        fontSize={1.5}
      />
      <CameraController />

      <WindEffect />

      {/*
      <Flag
        position={[6, -8, 0]}
        swingSpeed={2}
      />*/}

    </Canvas>
  );
};

export default IntroBackgroundTheme;
