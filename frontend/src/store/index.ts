import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
    selectedCampaignId: number | null;
    pacingData: { timestamp: string; spend: number; targetSpend: number }[];
}

const initialState: DashboardState = {
    selectedCampaignId: 1,
    pacingData: [],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setSelectedCampaignId: (state, action: PayloadAction<number | null>) => {
            state.selectedCampaignId = action.payload;
        },
        addPacingData: (state, action: PayloadAction<{ timestamp: string; spend: number; targetSpend: number }>) => {
            state.pacingData.push(action.payload);
            if (state.pacingData.length > 60) {
                state.pacingData.shift(); // Keep last 60 seconds
            }
        },
    },
});

export const { setSelectedCampaignId, addPacingData } = dashboardSlice.actions;

export const store = configureStore({
    reducer: {
        dashboard: dashboardSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
