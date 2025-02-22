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

//export const getPickedCocktail = createAsyncThunk<ICocktail, string>(
//     "cocktails/getPickedCocktail",
//     async (cocktail) => {
//         const response = await axiosAPI.get<ICocktail>(`/cocktails/${cocktail}`)
//         return response.data;
//     }
// )

export const getPickedPicture = createAsyncThunk<IPicture, string>(
    "pictures/getPickedPictures",
    async (picture) => {
        const response = await axiosAPI.get<IPicture>(`pictures/${picture}`)
        return response.data;
    }
)