import {IPicture} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getPictures} from "./picturesThunk.ts";
import {RootState} from "../../app/store.ts";

interface PictureState {
    pictures: IPicture[];
    loading: boolean;
}

const initialState: PictureState = {
    pictures: [],
    loading: false,
}

export const selectPictures = (state: RootState) => state.pictures.pictures;
export const selectPicturesLoading = (state: RootState) => state.pictures.loading;


export const picturesSlice = createSlice({
    name: "pictures",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPictures.pending, (state) => {
                state.loading = true
            })
            .addCase(getPictures.fulfilled, (state, action: PayloadAction<IPicture[]>) => {
                state.pictures = action.payload
                state.loading = false
            })
            .addCase(getPictures.rejected, (state) => {
                state.loading = false
            })
    }
})

export const picturesReducer = picturesSlice.reducer;