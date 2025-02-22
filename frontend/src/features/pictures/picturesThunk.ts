import {IPicture} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export const getPictures = createAsyncThunk<IPicture[], string | undefined>(
    "pictures/getPictures",
    async (id) => {
        const url = id ? `pictures/?user=${id}` : "/pictures";
        const response = await axiosAPI.get<IPicture[]>(url);
        return response.data || [];
    }
)

export const getPickedPicture = createAsyncThunk<IPicture, string>(
    "pictures/getPickedPictures",
    async (picture) => {
        const response = await axiosAPI.get<IPicture>(`pictures/${picture}`)
        return response.data;
    }
)
