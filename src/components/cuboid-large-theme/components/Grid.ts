import * as THREE from 'three';

export default class Grid {
    positions: { x: number; y: number }[] = [];
    leftBottomPosition: { x: number; y: number };
    lowerLeftPositions: { x: number; y: number }[] = [];
    rightTopPositions: { x: number; y: number }[] = [];

    constructor(gridSize: number, cellSize: number, camera: THREE.OrthographicCamera) {
        // Генерация всех позиций в сетке
        for (let col = 0; col < gridSize * 2; col++) {
            const rowCount = gridSize * 2 - col;
            // Генерация строк от нижней к верхней
            for (let row = rowCount - 1; row >= 0; row--) {
                const x = camera.left + cellSize / 2 + row * cellSize;
                const y = camera.bottom + cellSize / 2 + col * cellSize;
                this.positions.push({ x, y });
            }
        }        

        console.log(this.positions);

        // Определяем левую нижнюю позицию
        this.leftBottomPosition = {
            x: camera.left + cellSize / 2,
            y: camera.bottom + cellSize / 2,
        };

        // Определяем позиции для левой нижней части (увеличенный шанс)
        this.lowerLeftPositions = this.positions.filter(
            (pos) =>
                pos.x <= camera.left + (gridSize / 3) * cellSize &&
                pos.y <= camera.bottom + (gridSize / 3) * cellSize
        );

        // Определяем позиции для правой верхней части (уменьшенный шанс)
        this.rightTopPositions = this.positions.filter(
            (pos) =>
                pos.x >= camera.right - (gridSize / 3) * cellSize &&
                pos.y >= camera.top - (gridSize / 3) * cellSize
        );
    }

    getSpawnPosition(): { x: number; y: number } | undefined {
        const random = Math.random();

        // Гарантированное распределение для левого нижнего угла
        if (this.positions.includes(this.leftBottomPosition)) {
            this.positions = this.positions.filter(
                (pos) =>
                    pos.x !== this.leftBottomPosition.x || pos.y !== this.leftBottomPosition.y
            );
            return this.leftBottomPosition;
        }

        // Увеличенный шанс (70%) для левой нижней части
        if (this.lowerLeftPositions.length > 0 && random < 0.7) {
            const randomIndex = Math.floor(Math.random() * this.lowerLeftPositions.length);
            const chosenPosition = this.lowerLeftPositions.splice(randomIndex, 1)[0];
            this.positions = this.positions.filter(
                (pos) => pos.x !== chosenPosition.x || pos.y !== chosenPosition.y
            );
            return chosenPosition;
        }

        // Уменьшенный шанс (20%) для правой верхней части
        if (this.rightTopPositions.length > 0 && random < 0.9) {
            const randomIndex = Math.floor(Math.random() * this.rightTopPositions.length);
            const chosenPosition = this.rightTopPositions.splice(randomIndex, 1)[0];
            this.positions = this.positions.filter(
                (pos) => pos.x !== chosenPosition.x || pos.y !== chosenPosition.y
            );
            return chosenPosition;
        }

        // Распределение оставшихся позиций
        if (this.positions.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.positions.length);
            return this.positions.splice(randomIndex, 1)[0];
        }

        return undefined;
    }
}
