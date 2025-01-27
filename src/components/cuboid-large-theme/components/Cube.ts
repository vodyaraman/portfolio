import * as THREE from 'three';

export default class Cube {
    mesh: THREE.Mesh;
    public color: number;

    constructor(size: number, color: number, opacity: number) {
        // Геометрия куба
        const geometry = new THREE.BoxGeometry(size, size, size);
        this.color = color;

        const texture = new THREE.TextureLoader().load(
            'textures/108.jpg',
            () => console.log('Текстура успешно загружена'),
            undefined,
            (error) => console.error('Ошибка загрузки текстуры:', error)
        );
        
        // Материал с текстурой ткани
        const material = new THREE.MeshStandardMaterial({
            color, // Базовый цвет
            roughness: 0.4, // Высокая шероховатость для имитации ткани
            map: texture,
            opacity, // Прозрачность
            transparent: true, // Включение прозрачности
        });
    
        // Создаем меш
        this.mesh = new THREE.Mesh(geometry, material);
    
        // Устанавливаем начальный масштаб
        this.mesh.scale.set(0, 0, 0); // Если это часть анимации, оставляем как есть
    }
    
    

    animateScale(targetScale: { x: number; y: number; z: number }, duration: number) {
        const startTime = performance.now();
        const initialScale = { ...this.mesh.scale };

        const animate = (time: number) => {
            const elapsedTime = time - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            this.mesh.scale.set(
                initialScale.x + (targetScale.x - initialScale.x) * progress,
                initialScale.y + (targetScale.y - initialScale.y) * progress,
                initialScale.z + (targetScale.z - initialScale.z) * progress
            );

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    setOpacity() {
        const material = this.mesh.material as THREE.MeshStandardMaterial;

        if (material.transparent) {
            material.opacity = 0.5; // Устанавливаем прозрачность

            // Добавляем уменьшение куба
            this.animateScale({ x: 0.75, y: 0.75, z: 0.75 }, 250);
        }
    }

    resetOpacity() {
        const material = this.mesh.material as THREE.MeshStandardMaterial;

        if (material.transparent) {
            material.opacity = 1.0; // Сбрасываем прозрачность

            // Добавляем увеличение куба
            this.animateScale({ x: 1, y: 1, z: 1 }, 250);
        }
    }
}
