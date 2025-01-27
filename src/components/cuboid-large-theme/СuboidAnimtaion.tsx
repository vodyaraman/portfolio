import React, { Component, type RefObject } from 'react';
import * as THREE from 'three';
import Cube from './components/Cube';
import Grid from './components/Grid';

interface ThreeSceneProps {
    adapt: 'left' | 'right'; // Обязательный пропс для выбора ориентации камеры
}

class ThreeScene extends Component<ThreeSceneProps> {
    private containerRef: RefObject<HTMLDivElement | null>;
    private scene!: THREE.Scene;
    private camera!: THREE.OrthographicCamera;
    private renderer!: THREE.WebGLRenderer;
    private cubes: Cube[] = [];
    private grid!: Grid;
    private animationId?: number;
    private raycaster = new THREE.Raycaster();
    private mouse = new THREE.Vector2();
    private lastIntersectedCube: Cube | null = null;

    constructor(props: ThreeSceneProps) {
        super(props);
        this.containerRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        const container = this.containerRef.current;

        if (!container) {
            console.error('Container not found!');
            return;
        }

        this.scene = new THREE.Scene();

        // Настройка камеры
        const aspect = container.offsetWidth / container.offsetHeight;
        const frustumSize = 10;

        this.camera = new THREE.OrthographicCamera(
            -frustumSize * aspect / 2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            -frustumSize / 2,
            0.1,
            1000
        );


        this.camera.position.set(3, 1, 10);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        const size = this.calculateSize();
        this.grid = new Grid(7, size, this.camera);

        const ambientLight = new THREE.AmbientLight(0xffffff, 5);
        this.scene.add(ambientLight);

        this.addCubesWithAnimation();

        this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('resize', this.handleWindowResize);

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
            if (count >= 50) {
                clearInterval(interval);
                return;
            }
            this.addCube();
            count++;
        }, 10);
    };

    addCube = () => {
        const spawnPosition = this.grid.getSpawnPosition();
        if (!spawnPosition) return;

        const size = this.calculateSize();

        const minGray = 50; // Минимальный оттенок серого (светлый)
        const maxGray = 255; // Максимальный оттенок серого (белый)

        // Генерируем случайное значение серого в указанном диапазоне
        const grayValue = Math.floor(minGray + Math.random() * (maxGray - minGray));

        // Убедимся, что цвет корректно преобразуется в формат 0xRRGGBB
        const grayColor = (grayValue << 16) | (grayValue << 8) | grayValue;

        console.log(`Generated gray color: #${grayColor.toString(16).padStart(6, '0')}`); // Для отладки

        // Создаем куб с этим цветом
        const cube = new Cube(size, grayColor, 1); // Полностью непрозрачный куб

        cube.mesh.position.set(spawnPosition.x, spawnPosition.y, 0);
        this.scene.add(cube.mesh);
        cube.animateScale({ x: 1, y: 1, z: 1 }, 1000);
        this.cubes.push(cube);
    };

    handleWindowResize = () => {
        const container = this.containerRef.current;
        if (!container) return;

        const aspect = container.offsetWidth / container.offsetHeight;
        const frustumSize = 10;

        this.camera.left = -frustumSize * aspect / 2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = -frustumSize / 2;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    };

    onMouseMove = (event: MouseEvent) => {
        const rect = this.renderer.domElement.getBoundingClientRect();

        // Преобразование координат мыши в пространство WebGL
        const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const normalizedY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Учитываем ориентацию окна
        if (this.props.adapt === 'right') {
            // Инвертируем X и Y для ориентации "right"
            this.mouse.x = -normalizedX;
            this.mouse.y = -normalizedY;
        } else {
            // Используем обычные координаты для "left"
            this.mouse.x = normalizedX;
            this.mouse.y = normalizedY;
        }

        // Обновляем луч Raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Проверяем пересечения с кубами
        const intersects = this.raycaster.intersectObjects(this.cubes.map(cube => cube.mesh));

        if (intersects.length > 0) {
            const intersectedCube = intersects[0].object;

            // Находим соответствующий куб
            const cube = this.cubes.find(c => c.mesh === intersectedCube);

            if (cube && cube !== this.lastIntersectedCube) {
                // Если это новый куб, сбрасываем прозрачность с предыдущего
                if (this.lastIntersectedCube) {
                    this.lastIntersectedCube.resetOpacity();
                }

                // Устанавливаем текущий куб и задаём ему прозрачность
                this.lastIntersectedCube = cube;
                cube.setOpacity(); // Устанавливаем прозрачность 0.5
            }
        } else if (this.lastIntersectedCube) {
            // Если курсор ушёл с куба
            this.lastIntersectedCube.resetOpacity();
            this.lastIntersectedCube = null;
        }
    };


    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(this.renderScene);
    };

    calculateSize = () => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const baseSize = aspectRatio / 4;

        const minSize = 0.5;
        const maxSize = 2;

        return Math.min(Math.max(baseSize, minSize), maxSize);
    };

    render() {
        return (
            <div
                ref={this.containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        );
    }
}

export default ThreeScene;
