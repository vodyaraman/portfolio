import * as THREE from 'three';

export default class Cube {
    mesh: THREE.Mesh;

    constructor(size: number, color: number, opacity: number) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshBasicMaterial({
            color,
            transparent: true, // Включаем прозрачность
            opacity, // Устанавливаем случайную прозрачность
        });
        this.mesh = new THREE.Mesh(geometry, material);

        // Добавляем чёрный контур
        //const edges = new THREE.EdgesGeometry(geometry);
        //const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        //const edgesMesh = new THREE.LineSegments(edges, lineMaterial);
        //this.mesh.add(edgesMesh);

        // Устанавливаем начальный масштаб
        this.mesh.scale.set(0, 0, 0);
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
}
