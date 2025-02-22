import { IPicture, Picture } from "../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import { RootState } from "../../app/store.ts";

export const getPictures = createAsyncThunk<IPicture[], string | undefined>(
  "pictures/getPictures",
  async (id) => {
    const url = id ? `pictures/?user=${id}` : "/pictures";
    const response = await axiosAPI.get<IPicture[]>(url);
    return response.data || [];
  },
);

export const getPickedPicture = createAsyncThunk<IPicture, string>(
  "pictures/getPickedPictures",
  async (picture) => {
    const response = await axiosAPI.get<IPicture>(`pictures/${picture}`);
    return response.data;
  },
);

export const deletePictureById = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("pictures/deletePictureById", async (id, { getState }) => {
  const token = getState().users.user?.token;
  await axiosAPI.delete(`/pictures/${id}`, {
    headers: { Authorization: token },
  });
});

export const postPicture = createAsyncThunk<
  void,
  Picture,
  { state: RootState }
>("pictures/postPicture", async (picture, { getState }) => {
  const token = getState().users.user?.token;

  const formData = new FormData();

  const keys = Object.keys(picture) as (keyof Picture)[];

  keys.forEach((key) => {
    const value = picture[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosAPI.post("/pictures", formData, {
    headers: { Authorization: token },
  });
});
