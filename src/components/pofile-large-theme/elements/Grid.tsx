import { useRef, useMemo, useEffect, useState } from 'react';
import { InstancedMesh, Matrix4, BoxGeometry, Quaternion, Vector3, MeshStandardMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

type CubeState = {
  targetScale: number
  currentScale: number
  z: number
}

const CubesGrid = () => {
    const meshRef = useRef<InstancedMesh | null>(null);
    const [hovered, setHovered] = useState<Set<number>>(new Set());
    const hoverRadius = 3;

    // Размеры сетки
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const segmentsCountX = 50;
    const segmentsCountY = Math.floor((screenHeight / screenWidth) * segmentsCountX);
    const boxSize = screenWidth / segmentsCountX;
    const count = segmentsCountX * segmentsCountY;

    // Состояние для анимации каждого куба
    const cubes = useRef<CubeState[]>([]);

    // Инициализация матриц и состояний
    const matrices = useMemo(() => {
        cubes.current = [];
        const arr: Matrix4[] = [];
        for (let i = 0; i < segmentsCountY; i++) {
            for (let j = 0; j < segmentsCountX; j++) {
                const matrix = new Matrix4();
                const x = j * boxSize - screenWidth / 2 + boxSize / 2;
                const y = -i * boxSize + screenHeight / 2 - boxSize / 2;
                const z = (Math.random() - 0.5) * 10 - 15;
                
                matrix.setPosition(x, y, z);
                arr.push(matrix);
                
                cubes.current.push({
                    targetScale: 1,
                    currentScale: 1,
                    z: z
                });
            }
        }
        return arr;
    }, [segmentsCountX, segmentsCountY, boxSize, screenWidth, screenHeight]);

    // Геометрия и материал
    const geometry = useMemo(() => new BoxGeometry(boxSize, boxSize, boxSize), [boxSize]);
    const material = useMemo(() => new MeshStandardMaterial({ 
        color: '#fff', 
        transparent: true,
        opacity: 0.5
    }), []);

    // Инициализация позиций
    useEffect(() => {
        if (meshRef.current) {
            matrices.forEach((matrix, index) => {
                meshRef.current!.setMatrixAt(index, matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [matrices]);

    // Анимация
    useFrame(() => {
        if (!meshRef.current) return;

        let needsUpdate = false;
        
        cubes.current.forEach((cube, index) => {
            // Определяем нужно ли анимировать этот куб
            const isHovered = hovered.has(index);
            cube.targetScale = isHovered ? 0 : 1;

            // Плавное изменение масштаба
            cube.currentScale += (cube.targetScale - cube.currentScale) * 0.05;
            
            if (Math.abs(cube.targetScale - cube.currentScale) > 0.01) {
                needsUpdate = true;
                
                const matrix = new Matrix4();
                const position = new Vector3();
                matrices[index].decompose(position, new Quaternion(), new Vector3());
                
                matrix.compose(
                    new Vector3(position.x, position.y, cube.z), // Сохраняем исходный Z
                    new Quaternion(),
                    new Vector3(cube.currentScale, cube.currentScale, cube.currentScale)
                );
                
                meshRef.current!.setMatrixAt(index, matrix);
            }
        });

        if (needsUpdate) {
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    // Обработка наведения
    const handlePointerMove = (e: any) => {
        if (!meshRef.current || e.instanceId === undefined) return;
        
        const centerX = e.instanceId % segmentsCountX;
        const centerY = Math.floor(e.instanceId / segmentsCountX);
        const hoveredIndices = new Set<number>();

        for (let y = -hoverRadius; y <= hoverRadius; y++) {
            for (let x = -hoverRadius; x <= hoverRadius; x++) {
                if (x*x + y*y > hoverRadius**2) continue;
                
                const col = centerX + x;
                const row = centerY + y;
                
                if (col >= 0 && col < segmentsCountX && row >= 0 && row < segmentsCountY) {
                    hoveredIndices.add(row * segmentsCountX + col);
                }
            }
        }
        
        setHovered(hoveredIndices);
    };

    return (
        <instancedMesh
            ref={meshRef}
            args={[geometry, material, count]}
            onPointerMove={handlePointerMove}
            onPointerOut={() => setHovered(new Set())}
        />
    );
};

export default CubesGrid;