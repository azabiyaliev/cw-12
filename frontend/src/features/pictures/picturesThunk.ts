import {IPicture} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export const getPictures = createAsyncThunk<IPicture[], void>(
    "pictures/getPictures",
    async () => {
        const response = await axiosAPI.get<IPicture[]>("/pictures")
        return response.data;
    }
)