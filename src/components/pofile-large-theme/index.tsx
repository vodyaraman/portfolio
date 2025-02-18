import { Canvas, useThree } from '@react-three/fiber';
import CubesGrid from './elements/Grid.tsx';
import { CameraControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const BackgroundTexture = ({ texturePath }: { texturePath: string; }) => {
    const { scene } = useThree();
    const bgRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        // Загрузка текстуры и создание фона
        const texture = new THREE.TextureLoader().load(texturePath);

        // Создание фоновой плоскости
        const planeGeometry = new THREE.PlaneGeometry(
            window.innerWidth,  
            window.innerHeight
        );
        
        const planeMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            depthWrite: false,
            depthTest: false
        });

        const backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
        backgroundPlane.position.z = 0;
        scene.add(backgroundPlane);
        bgRef.current = backgroundPlane;

        return () => {
            scene.remove(backgroundPlane);
            texture.dispose();
        };
    }, [texturePath, scene]);

    return null;
};

const ProfileBackgroundTheme = () => {
    return (
        <Canvas
            orthographic
            camera={{
                position: [0, 5, 100],
                zoom: 1,
                near: 0.1,
                far: 200, // Увеличиваем дальность видимости
                left: -window.innerWidth / 2,
                right: window.innerWidth / 2,
                top: window.innerHeight / 2,
                bottom: -window.innerHeight / 2,
            }}
        >
            <BackgroundTexture texturePath="/textures/icy-profile.webp"/>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 2, 6]} intensity={3} />
            <CubesGrid />
        </Canvas>
    );
};

export default ProfileBackgroundTheme;