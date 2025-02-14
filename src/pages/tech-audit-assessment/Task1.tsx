import React, { useState } from 'react';

type Entry = [string, string | number];
type NestedArray = Entry[];
type InputData = NestedArray[];

type TransformedData = {
    label: string;
    value: number;
};

const TaskOne: React.FC = () => {
    const [inputData, setInputData] = useState<string>('');
    const [outputData, setOutputData] = useState<TransformedData[]>([]);

    const transformData = (data: InputData): TransformedData[] => {
        return data.map((entry) => {
            const obj: Record<string, string | number> = Object.fromEntries(entry);
            return {
                label: `${obj.name}, ${obj.age}`,
                value: Number(obj.id),
            };
        });
    };

    const handleTransform = () => {
        try {
            const parsedData: InputData = JSON.parse(inputData);
            if (!Array.isArray(parsedData)) throw new Error();
            setOutputData(transformData(parsedData));
        } catch (error) {
            alert('Ошибка парсинга JSON. Проверьте формат входных данных.');
        }
    };

    return (
        <div>
            <h2>Task One: Transform Nested Arrays</h2>
            <textarea
                rows={5}
                cols={50}
                placeholder='Введите JSON, например: [[["id",1],["name","Ivan"],["age",23]]]'
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
            />
            <br />
            <button onClick={handleTransform}>Преобразовать</button>
            <h3>Результат:</h3>
            <ul>
                {outputData.map((item, index) => (
                    <li key={index}>{item.label} (ID: {item.value})</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskOne;
