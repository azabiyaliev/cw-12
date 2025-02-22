import { IPicture } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deletePictureById,
  getPickedPicture,
  getPictures,
  postPicture,
} from "./picturesThunk.ts";
import { RootState } from "../../app/store.ts";

interface PictureState {
  pictures: IPicture[];
  pickedPicture: IPicture | null;
  loading: boolean;
  postLoading: boolean;
  deleteLoading: boolean;
}

const initialState: PictureState = {
  pictures: [],
  pickedPicture: null,
  loading: false,
  postLoading: false,
  deleteLoading: false,
};

export const selectPictures = (state: RootState) => state.pictures.pictures;
export const selectPicturesLoading = (state: RootState) =>
  state.pictures.loading;
export const selectPickedPictures = (state: RootState) =>
  state.pictures.pickedPicture;
export const selectPostPicture = (state: RootState) =>
  state.pictures.postLoading;
export const selectDeletePicture = (state: RootState) =>
  state.pictures.deleteLoading;

export const picturesSlice = createSlice({
  name: "pictures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPictures.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPictures.fulfilled,
        (state, action: PayloadAction<IPicture[]>) => {
          state.pictures = action.payload;
          state.loading = false;
        },
      )
      .addCase(getPictures.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPickedPicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPickedPicture.fulfilled,
        (state, action: PayloadAction<IPicture>) => {
          state.pickedPicture = action.payload;
          state.loading = false;
        },
      )
      .addCase(getPickedPicture.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deletePictureById.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePictureById.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deletePictureById.rejected, (state) => {
        state.deleteLoading = false;
      })
      .addCase(postPicture.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(postPicture.fulfilled, (state) => {
        state.postLoading = false;
      })
      .addCase(postPicture.rejected, (state) => {
        state.postLoading = false;
      });
  },
});

export const picturesReducer = picturesSlice.reducer;
