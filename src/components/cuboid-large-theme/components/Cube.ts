import * as THREE from 'three';

export default class Cube {
    mesh: THREE.Mesh;
    public color: number;

    constructor(size: number, color: number, opacity: number) {
        // Геометрия куба
        const geometry = new THREE.BoxGeometry(size, size, size);
        this.color = color;

        // Стандартный материал с нормалями
        const material = new THREE.MeshStandardMaterial({
            color,
            transparent: true,
            opacity,
            roughness: 0, // Более гладкая поверхность
            metalness: 0, // Добавляем отражения
        });

        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.scale.set(0, 0, 0); // Устанавливаем начальный масштаб
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
            material.opacity = 0.5; // Сбрасываем прозрачность
        }
    };

    resetOpacity() {
        const material = this.mesh.material as THREE.MeshStandardMaterial;
    
        if (material.transparent) {
            material.opacity = 1.0; // Сбрасываем прозрачность
        }
    }
     
}
