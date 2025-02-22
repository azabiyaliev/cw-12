import {Picture} from "../../../types";
import React, {ChangeEvent, FormEvent, useState} from "react";
import Container from "@mui/material/Container";
import {Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import FileInput from "../../../components/FileInput/FileInput.tsx";

interface Props {
    onSubmit: (picture: Picture) => void;
}

const initialState = {
    title: "",
    image: null,
};

const PictureForm: React.FC<Props> = ({onSubmit}) => {

    const [form, setForm] = useState<Picture>(initialState);

    const submitFormHandler = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({...form});
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prevState) => ({...prevState, [name]: value}));
    };

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0] || null,
            }));
        }
    };

    return (
        <form onSubmit={submitFormHandler}>
            <Container maxWidth="xl">
                <Typography variant={"h5"} sx={{ mt: 4, textAlign: "center"}}>Add new photo</Typography>
                <Box
                    sx={{
                        width: "50%",
                        borderRadius: "10px",
                        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                        border: "1px solid gray",
                        marginTop: 5,
                        mx: "auto",
                        p: 2,
                    }}
                >
                    <Grid container direction="column" spacing={2}>
                        <Grid size={{xs: 12}}>
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                sx={{width: "100%"}}
                                required
                                value={form.title}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <FileInput
                                name="image"
                                label="Image"
                                onGetFile={fileEventChangeHandler}
                            />
                        </Grid>

                        <Grid>
                            <Button type="submit" color="primary">
                                Create Picture
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </form>

    );
};

export default PictureForm;