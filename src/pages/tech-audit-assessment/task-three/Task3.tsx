import React from "react";
import { useAppSelector } from "./store/index.ts";

interface Props {
    sliceId: number;
}

const TaskThree: React.FC<Props> = ({ sliceId }) => {
    const dashboardLayout = useAppSelector((state) => state.dashboardLayout.present);

    // Дебаг-лог (проверить, получает ли компонент Redux-данные)
    console.log("Dashboard Layout:", dashboardLayout);

    // Проверяем, существует ли нужный элемент
    const chartEntry = Object.values(dashboardLayout).find((item) => item.meta.chartId === sliceId);

    // Получаем название графика
    const customChartName = chartEntry?.meta.sliceNameOverride || chartEntry?.meta.sliceName || "Unknown Chart";

    return (
        <div>
            <h2>Task Three: Chart Info</h2>
            <h1>{customChartName}</h1>
        </div>
    );
};

export default TaskThree;

