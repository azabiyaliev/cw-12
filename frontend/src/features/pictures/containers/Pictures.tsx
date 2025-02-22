import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectPickedPictures, selectPictures, selectPicturesLoading} from "../picturesSlice.ts";
import {getPickedPicture, getPictures} from "../picturesThunk.ts";
import React, {useEffect} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import {apiUrl} from "../../../globalConstants.ts";
import Box from "@mui/material/Box";
import ModalWindow from "../../../components/ModalWindow/ModalWindow.tsx";
import {NavLink} from "react-router-dom";


const Pictures = () => {
    const dispatch = useAppDispatch();
    const pictures = useAppSelector(selectPictures);
    const loading = useAppSelector(selectPicturesLoading);
    const pickedPicture = useAppSelector(selectPickedPictures)
    const [open, setOpen] = React.useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    console.log(pictures);

    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch])

    const pictureView = async (id: string) => {
        openModal();
        await dispatch(getPickedPicture(id));
    }

    return (
        <Container maxWidth="lg">
            <Grid container direction={"row"} spacing={3}>
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        {pictures.length === 0 && !loading ? (
                            <Typography variant="h6">
                                No pictures yet
                            </Typography>
                        ) : (
                            <>
                                {pictures.map((picture) => {
                                    return (
                                        <Grid key={picture._id} size={4}>
                                            <Card sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '93%',
                                                maxWidth: 345,
                                                mt: 5,
                                                borderRadius: 2,
                                                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                                                "&:hover": {boxShadow: 10}
                                            }}>
                                                <CardActionArea>
                                                    <ModalWindow onClose={closeModal} open={open}
                                                                 image={apiUrl + "/" + (pickedPicture ? pickedPicture.image : null)}
                                                                 title={pickedPicture ? pickedPicture.title : ""}/>
                                                    <CardMedia
                                                        style={{width: "100%"}}
                                                        height={400}
                                                        component="img"
                                                        image={apiUrl + "/" + picture.image}
                                                        title={picture.title}
                                                        onClick={() => {
                                                            void pictureView(picture._id)
                                                        }}
                                                    />
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: "50%"
                                                    }}>
                                                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                            <CardContent>
                                                                <Typography
                                                                    variant="h6" textAlign="center"
                                                                    fontWeight="bold"
                                                                >
                                                                    {picture.title}
                                                                </Typography>
                                                                <Typography
                                                                    variant="h6" textAlign="center"
                                                                    sx={{textDecoration: "none", color: "inherit"}}
                                                                    fontWeight="bold"
                                                                    to={`/users/${picture.user._id}`}
                                                                    component={NavLink}
                                                                >
                                                                    От: {picture.user.displayName}
                                                                </Typography>
                                                            </CardContent>
                                                        </Box>
                                                    </Box>

                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </>
                        )}
                    </>
                )}
            </Grid>
        </Container>
    );
};

export default Pictures;