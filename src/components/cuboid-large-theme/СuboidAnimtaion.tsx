import React, { Component, type RefObject } from 'react';
import * as THREE from 'three';

class ThreeScene extends Component {
    private containerRef: RefObject<HTMLDivElement | null>;
    private scene!: THREE.Scene;
    private camera!: THREE.OrthographicCamera;
    private renderer!: THREE.WebGLRenderer;
    private cubes: THREE.Mesh[] = [];
    private animationId?: number;

    constructor(props: {}) {
        super(props);
        this.containerRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        const container = this.containerRef.current;

        if (!container) {
            console.error('Container not found!');
            return;
        }

        // Создаем сцену
        this.scene = new THREE.Scene();

        // Создаем камеру
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 10;

        this.camera = new THREE.OrthographicCamera(
            -frustumSize * aspect / 2, // Левая граница
            frustumSize * aspect / 2,  // Правая граница
            frustumSize / 2,           // Верхняя граница
            -frustumSize / 2,          // Нижняя граница
            0.1,                       // Ближняя плоскость отсечения
            1000                       // Дальняя плоскость отсечения
        );
        this.camera.position.set(0, 0, 10); // Камера в позиции, чтобы видеть кубы
        this.camera.lookAt(0, 0, 0); // Направляем камеру на центр

        // Создаем рендерер
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        // Добавляем свет
        const light = new THREE.AmbientLight(0x0000000, 1); // Белый свет
        this.scene.add(light);

        // Запуск анимации появления кубов
        this.addCubesWithAnimation();

        // Обработка изменения размера окна
        window.addEventListener('resize', this.handleWindowResize);

        // Запуск рендера сцены
        this.renderScene();
    }

    componentWillUnmount() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.handleWindowResize);

        if (this.renderer) {
            this.renderer.dispose();
        }
    }

    addCubesWithAnimation = () => {
        let count = 0;
        const interval = setInterval(() => {
            if (count >= 10) {
                clearInterval(interval);
                return;
            }
            this.addCube(count);
            count++;
        }, 10); // Интервал появления кубов — 1 секунда
    };

    addCube = (index: number) => {
        const baseSize = Math.random() * 0.5; // Базовый размер для всех кубов
        const size = index === 0 ? baseSize * 5 : baseSize; // Первый куб в 5 раз больше остальных
    
        const geometry = new THREE.BoxGeometry(size, size, size);
    
        // Белый куб
        const material = new THREE.MeshBasicMaterial({ color: 0x424242 });
        const cube = new THREE.Mesh(geometry, material);
    
        // Черный контур
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const edgesMesh = new THREE.LineSegments(edges, lineMaterial);
        cube.add(edgesMesh);
    
        // Вычисление позиции куба
        let x, y;
    
        if (index === 0) {
            // Первый куб в левом нижнем углу
            x = this.camera.left + size / 2; // Центр куба
            y = this.camera.bottom + size / 2; // Центр куба
        } else {
            // Следующий куб вплотную к предыдущему
            const prevCube = this.cubes[index - 1];
            const prevSize = prevCube.geometry; // Размер предыдущего куба
            x = prevCube.position.x + prevSize / 2 + size / 2; // Правая граница предыдущего + половина нового
            y = prevCube.position.y; // Тот же уровень по Y
        }
    
        cube.position.set(x, y, 0); // Z остается 0
    
        // Добавляем в сцену
        this.scene.add(cube);
        this.cubes.push(cube);
    
        // Анимация появления
        cube.scale.set(0, 0, 0);
        const targetScale = { x: 1, y: 1, z: 1 };
        this.animateCubeScale(cube, targetScale, 1000); // Анимация 1 секунда
    };
    
    

    animateCubeScale = (cube: THREE.Mesh, targetScale: { x: number; y: number; z: number }, duration: number) => {
        const startTime = performance.now();
        const initialScale = { ...cube.scale };

        const animate = (time: number) => {
            const elapsedTime = time - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Прогресс от 0 до 1

            // Линейная интерполяция масштаба
            cube.scale.set(
                initialScale.x + (targetScale.x - initialScale.x) * progress,
                initialScale.y + (targetScale.y - initialScale.y) * progress,
                initialScale.z + (targetScale.z - initialScale.z) * progress
            );

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    handleWindowResize = () => {
        const container = this.containerRef.current;
        if (!container) return;
    
        const aspect = container.offsetWidth / container.offsetHeight;
        const frustumSize = 10;
    
        // Обновляем границы камеры
        this.camera.left = -frustumSize * aspect / 2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = -frustumSize / 2;
        this.camera.updateProjectionMatrix();
    
        // Обновляем размер рендера
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    };
    

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(this.renderScene);
    };

    render() {
        return (
            <div
                ref={this.containerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            />
        );
    }
}

export default ThreeScene;
