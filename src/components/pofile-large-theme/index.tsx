import { Canvas } from '@react-three/fiber';
import CubesGrid from './elements/Grid.tsx';
import { CameraControls } from '@react-three/drei';

const ProfileBackgroundTheme = () => {
    return (
        <Canvas
            orthographic // Используем ортографическую камеру
            camera={{
                position: [0, 0, 10],
                zoom: 1, // Уровень масштабирования ортографической камеры
                near: 0.1,
                far: 100,
                left: -window.innerWidth / 2,
                right: window.innerWidth / 2,
                top: window.innerHeight / 2,
                bottom: -window.innerHeight / 2,
            }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 6]} intensity={3} />
            <CubesGrid />
            <CameraControls/>
        </Canvas>
    );
};

export default ProfileBackgroundTheme;