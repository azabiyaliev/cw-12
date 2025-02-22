import {Picture} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {postPicture} from "../picturesThunk.ts";
import {toast} from "react-toastify";
import {selectPostPicture} from "../picturesSlice.ts";
import {CircularProgress} from "@mui/material";
import PictureForm from "../components/PictureForm.tsx";


const NewPicture = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectPostPicture)

    const onSubmitForm = async (picture: Picture) => {
        try {
            await dispatch(postPicture(picture)).unwrap();
            toast.success("Picture was successfully created!");
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <>
            {loading ? (
                <CircularProgress/>
            ) : (
                <PictureForm onSubmit={onSubmitForm}/>
            )}

        </>
    );
};

export default NewPicture;