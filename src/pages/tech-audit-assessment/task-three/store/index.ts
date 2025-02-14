import { configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

// Описание структуры Dashboard Layout
interface LayoutItem {
    id: string;
    meta: {
        chartId: number;
        sliceName: string;
        sliceNameOverride?: string;
    };
}

interface DashboardLayoutState {
    present: Record<string, LayoutItem>;
}

// Начальное состояние (моковые данные)
const initialState: DashboardLayoutState = {
    present: {
        "widget-1": { id: "widget-1", meta: { chartId: 101, sliceName: "Sales Chart", sliceNameOverride: "Monthly Sales" } },
        "widget-2": { id: "widget-2", meta: { chartId: 102, sliceName: "User Growth" } },
        "widget-3": { id: "widget-3", meta: { chartId: 103, sliceName: "Profit Chart", sliceNameOverride: "Quarterly Profit" } },
    },
};

// Создаем редьюсер
const dashboardReducer = (state = initialState) => state;

// Конфигурируем Redux-Store
export const store = configureStore({
    reducer: {
        dashboardLayout: dashboardReducer,
    },
});

// Хуки для селекторов
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
