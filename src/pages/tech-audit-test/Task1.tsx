import React, { useState } from 'react';

type Entry = [string, string | number];
type NestedArray = Entry[];
type InputData = NestedArray[];

type TransformedData = {
    label: string;
    value: number;
};

const defaultJson = JSON.stringify([
    [["id", 1], ["name", "Ivan"], ["age", 23]],
    [["id", 2], ["name", "Marina"], ["age", 30]],
    [["id", 3], ["name", "Anna"], ["age", 28]]
], null, 2);

const TaskOne: React.FC = () => {
    const [inputData, setInputData] = useState<string>(defaultJson);
    const [outputData, setOutputData] = useState<TransformedData[]>([]);

    // Solution for the provided task 1
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
            console.log("Task 1 output:", transformData(parsedData))
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
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
            />
            <br />
            <button onClick={handleTransform}>Transform</button>
            <h3>Result (also in console):</h3>
            <ul>
                {outputData.map((item, index) => (
                    <li key={index}>{item.label} (ID: {item.value})</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskOne;
