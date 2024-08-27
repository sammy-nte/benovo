import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editCampaign: null
}

const campaignEditSlice = createSlice({
    name: 'campaignEdit',
    initialState,
    reducers: {
        setCampaignEdit: (state, action) => {
            state.editCampaign = action.payload
        }
    }
})

export const {setCampaignEdit} = campaignEditSlice.actions
export default campaignEditSlice.reducer