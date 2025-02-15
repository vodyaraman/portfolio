import { configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

// Dashboard Layout structure
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

const initialState: DashboardLayoutState = {
    present: {
        "widget-1": { id: "widget-1", meta: { chartId: 101, sliceName: "Sales Chart", sliceNameOverride: "Monthly Sales" } },
        "widget-2": { id: "widget-2", meta: { chartId: 102, sliceName: "User Growth" } },
        "widget-3": { id: "widget-3", meta: { chartId: 103, sliceName: "Profit Chart", sliceNameOverride: "Quarterly Profit" } },
    },
};

const dashboardReducer = (state = initialState) => state;

export const store = configureStore({
    reducer: {
        dashboardLayout: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
