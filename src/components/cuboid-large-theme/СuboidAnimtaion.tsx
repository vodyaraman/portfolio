import React, { Component, type CSSProperties, type RefObject } from 'react';
import * as THREE from 'three';
import Cube from './components/Cube';
import Grid from './components/Grid';

class ThreeScene extends Component {
    private containerRef: RefObject<HTMLDivElement | null>;
    private scene!: THREE.Scene;
    private camera!: THREE.OrthographicCamera;
    private renderer!: THREE.WebGLRenderer;
    private cubes: Cube[] = [];
    private grid!: Grid;
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

        this.scene = new THREE.Scene();

        // Камера!
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 10;

        this.camera = new THREE.OrthographicCamera(
            -frustumSize * aspect / 2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            -frustumSize / 2,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        const size = this.calculateSize(); // Размер кубов (вернул как в оригинале)
        this.grid = new Grid(7, size, this.camera);


        // Свет!
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7); // Установите позицию света
        directionalLight.target.position.set(0, 0, 0); // Убедитесь, что свет направлен на центр
        directionalLight.castShadow = true; // Включение теней для света
        directionalLight.shadow.mapSize.width = 1024; // Разрешение теневой карты
        directionalLight.shadow.mapSize.height = 1024;

        this.scene.add(directionalLight);



        this.addCubesWithAnimation();

        window.addEventListener('resize', this.handleWindowResize);
        // Мотор!
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

        const opacity = 0.1 + Math.random() * 0.5;
        const cube = new Cube(size, 0x080529, opacity);
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

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(this.renderScene);
    };

    calculateSize = () => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const baseSize = aspectRatio / 4;

        // Устанавливаем минимальный и максимальный размер для квадрата
        const minSize = 0.5; // минимальный размер
        const maxSize = 2;   // максимальный размер

        return Math.min(Math.max(baseSize, minSize), maxSize);
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