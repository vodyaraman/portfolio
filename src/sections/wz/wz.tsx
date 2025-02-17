import { useState } from 'react';
import "./wz.scss";

const TTKCalculator = () => {
    const [activeTab, setActiveTab] = useState<'ttk' | 'recoil'>('ttk');

    // State для TTK
    const [damage, setDamage] = useState('');
    const [rpm, setRpm] = useState('');
    const [ttk, setTtk] = useState<number | null>(null);

    // State для отдачи
    const [recoilVert, setRecoilVert] = useState('');
    const [recoilHorz, setRecoilHorz] = useState('');
    const [recoilKick, setRecoilKick] = useState('');
    const [totalRecoil, setTotalRecoil] = useState<number | null>(null);

    const calculateTTK = () => {
        const health = 300; // Фиксированное значение здоровья цели
        const shotsNeeded = Math.ceil(health / (parseFloat(damage) || 1));
        const timePerShot = 60 / (parseFloat(rpm) || 1);
        setTtk((shotsNeeded - 1) * timePerShot);
    };

    const calculateRecoil = () => {
        const shots = 30; // Количество выстрелов для расчёта

        const vertRecoilTotal = shots * (parseFloat(recoilVert) || 0);
        const horzRecoilTotal = shots * (parseFloat(recoilHorz) || 0);
        const recoilKickTotal = shots * (parseFloat(recoilKick) || 0); // Добавление рывка отдачи

        // Суммарная отдача с учётом рывка
        const finalVert = vertRecoilTotal + recoilKickTotal;
        const finalHorz = horzRecoilTotal + recoilKickTotal;

        // Итоговый угол отклонения (по гипотенузе)
        const recoilMagnitude = Math.sqrt(finalVert ** 2 + finalHorz ** 2);

        setTotalRecoil(recoilMagnitude);
    };

    return (
        <div className="ttk-calculator">
            <h2>Калькулятор Warzone 2</h2>

            <div className="tabs">
                <button 
                    className={activeTab === 'ttk' ? 'active' : ''}
                    onClick={() => setActiveTab('ttk')}
                >
                    TTK
                </button>
                <button 
                    className={activeTab === 'recoil' ? 'active' : ''}
                    onClick={() => setActiveTab('recoil')}
                >
                    Отдача
                </button>
            </div>

            {activeTab === 'ttk' && (
                <div className="tab-content">
                    <h3>Калькулятор TTK</h3>
                    <div>
                        Урон за выстрел:
                        <input
                            type="number"
                            value={damage}
                            onChange={(e) => setDamage(e.target.value)}
                        />
                    </div>

                    <div>
                        Темп стрельбы (RPM):
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
            )}

            {activeTab === 'recoil' && (
                <div className="tab-content">
                    <h3>Калькулятор Отдачи</h3>
                    <div>
                        Вертикальная отдача (°):
                        <input
                            type="number"
                            value={recoilVert}
                            onChange={(e) => setRecoilVert(e.target.value)}
                        />
                    </div>

                    <div>
                        Горизонтальная отдача (°):
                        <input
                            type="number"
                            value={recoilHorz}
                            onChange={(e) => setRecoilHorz(e.target.value)}
                        />
                    </div>

                    <div>
                        Рывок оружия при отдаче (°):
                        <input
                            type="number"
                            value={recoilKick}
                            onChange={(e) => setRecoilKick(e.target.value)}
                        />
                    </div>

                    <button onClick={calculateRecoil}>Рассчитать Отдачу</button>

                    {totalRecoil !== null && (
                        <p>Общее смещение отдачи: <strong>{totalRecoil.toFixed(2)}°</strong></p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TTKCalculator;
