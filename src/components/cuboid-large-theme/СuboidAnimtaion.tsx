import React, { Component, type RefObject } from 'react';
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

        const frustumHeight = window.innerWidth / window.innerHeight; // Оригинальная высота видимой области
        const size = frustumHeight / 4; // Размер кубов (вернул как в оригинале)
        this.grid = new Grid(11, size, this.camera);


        const light = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(light);

        this.addCubesWithAnimation();

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

        const size = window.innerWidth / window.innerHeight / 4; // Оригинальный размер
        const opacity = 0.4 + Math.random() * 0.6; // Случайная прозрачность от 0.4 до 1
        const cube = new Cube(size, 0x424242, opacity);
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