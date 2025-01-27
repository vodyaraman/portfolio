import React, { Component, createRef } from "react";
import * as THREE from "three";

class ThreeSphere extends Component {
  private containerRef = createRef<HTMLDivElement>();
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  componentDidMount() {
    const container = this.containerRef.current;

    if (!container) {
      console.error("Container not found!");
      return;
    }

    // Создание сцены
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000); // Чёрный фон

    // Настройка камеры
    const aspect = container.offsetWidth / container.offsetHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.z = 5; // Расположение камеры

    // Создание рендера
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(this.renderer.domElement);

    // Добавление света
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);

    // Геометрия сферы
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Настройка материала (красный цвет)
    const material = new THREE.MeshStandardMaterial({
      color: 0xff0000, // Красный цвет
      roughness: 0.5,
      metalness: 0.2,
    });

    // Создание сферы
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);

    // Запуск отрисовки
    this.animate();
  }

  componentWillUnmount() {
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  animate = () => {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };

  render() {
    return (
      <div
        ref={this.containerRef}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    );
  }
}

export default ThreeSphere;
