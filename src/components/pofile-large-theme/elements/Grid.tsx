import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { InstancedMesh, Matrix4, MeshStandardMaterial, BoxGeometry } from 'three';

const CubesGrid = () => {
    const meshRef = useRef<InstancedMesh | null>(null);

    // Размеры экрана
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Количество сегментов по ширине и высоте
    const segmentsCountX = 50; // Количество кубов по ширине
    const segmentsCountY = Math.floor((screenHeight / screenWidth) * segmentsCountX); // Количество кубов по высоте

    // Размер каждого куба
    const boxSize = screenWidth / segmentsCountX;

    // Общее количество кубов
    const count = segmentsCountX * segmentsCountY;

    // Создаём матрицы для всех инстансов
    const matrices = useMemo(() => {
        const arr: Matrix4[] = [];
        for (let i = 0; i < segmentsCountY; i++) {
            for (let j = 0; j < segmentsCountX; j++) {
                const matrix = new Matrix4();
                const x = j * boxSize - screenWidth / 2 + boxSize / 2; // Позиция по X
                const y = -i * boxSize + screenHeight / 2 - boxSize / 2; // Позиция по Y
                const z = (Math.random() - 0.5) * 10; // Случайное расстояние по Z (от -10 до 10)
                matrix.setPosition(x, y, z);
                arr.push(matrix);
            }
        }
        return arr;
    }, [segmentsCountX, segmentsCountY, boxSize, screenWidth, screenHeight]);

    useEffect(() => {
        if (meshRef.current) {
            // Устанавливаем матрицы для всех инстансов
            matrices.forEach((matrix, index) => {
                meshRef.current!.setMatrixAt(index, matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [matrices]);

    useFrame(() => {
        // Можно добавить анимацию здесь
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[
                new BoxGeometry(boxSize, boxSize, boxSize),
                new MeshStandardMaterial({
                    color: 'red', // Цвет кубов
                    transparent: true,
                    opacity: 0.5
                }),
                count
            ]}
        />
    );
};

export default CubesGrid;