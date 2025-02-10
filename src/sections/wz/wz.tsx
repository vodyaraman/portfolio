import { useState } from 'react';
import "./wz.scss"

const TTKCalculator = () => {
    const [damage, setDamage] = useState('');
    const [rpm, setRpm] = useState('');
    const [ttk, setTtk] = useState<number | null>(null);

    const calculateTTK = () => {
        const health = 300; // Фиксированное значение здоровья цели
        const shotsNeeded = Math.ceil(health / (parseFloat(damage) || 1));
        const timePerShot = 60 / (parseFloat(rpm) || 1);
        setTtk((shotsNeeded - 1) * timePerShot);
    };

    return (
        <div className="ttk-calculator">
            <h2>Калькулятор TTK</h2>
            <div>
                Урон за выстрел:
                <input
                    type="number"
                    value={damage}
                    onChange={(e) => setDamage(e.target.value)}
                />
            </div>

            <div>
                Темп стрельбы:
                <input
                    type="number"
                    value={rpm}
                    onChange={(e) => setRpm(e.target.value)}
                />
            </div>

            <button onClick={calculateTTK}>Рассчитать TTK</button>

            {ttk !== null && (
                <p>Время для убийства: <strong>{ttk.toFixed(3)} сек</strong></p>
            )}
        </div>

    );
};

export default TTKCalculator;
