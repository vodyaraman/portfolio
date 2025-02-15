import React, { useMemo } from "react";
import { useAppSelector } from "./store/index.ts";

interface Props {
    sliceId: number;
}

const TaskThree: React.FC<Props> = ({ sliceId }) => {
    const dashboardLayout = useAppSelector((state) => state.dashboardLayout.present);

    // Filter only el-s with chartId to optimize search
    const charts = useMemo(
        () => Object.values(dashboardLayout).filter(item => item.meta.chartId),
        [dashboardLayout]
    );

    // Chart search with sliceId
    const chartEntry = useMemo(
        () => charts.find(item => item.meta.chartId === sliceId),
        [charts, sliceId]
    );

    // (priority: sliceNameOverride -> sliceName -> "Unknown Chart")
    const customChartName = chartEntry?.meta.sliceNameOverride || chartEntry?.meta.sliceName || "Unknown Chart";

    return (
        <div>
            <h2>Task Three: Chart Info</h2>
            <h1>{customChartName}</h1>
        </div>
    );
};

export default TaskThree;
