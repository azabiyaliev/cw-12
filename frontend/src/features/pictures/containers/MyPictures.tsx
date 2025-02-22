import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectPickedPictures, selectPictures, selectPicturesLoading} from "../picturesSlice.ts";
import React, {useEffect} from "react";
import {getPickedPicture, getPictures} from "../picturesThunk.ts";
import {NavLink, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import ModalWindow from "../../../components/ModalWindow/ModalWindow.tsx";
import {apiUrl} from "../../../globalConstants.ts";
import Box from "@mui/material/Box";

const MyPictures = () => {
    const params = useParams<{ idUser: string }>();
    const dispatch = useAppDispatch();
    const pictures = useAppSelector(selectPictures);
    const loadingPictures = useAppSelector(selectPicturesLoading);
    const pickedPicture = useAppSelector(selectPickedPictures)
    const userName = pictures[0].user?.displayName;
    const [open, setOpen] = React.useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    const pictureView = async (id: string) => {
        openModal();
        await dispatch(getPickedPicture(id));
    }
    useEffect(() => {
        if(params.idUser)
        dispatch(getPictures(params.idUser));
    }, [dispatch, params.idUser]);
    return (
        <Container maxWidth="lg">
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, fontSize: 18, textTransform: "uppercase"}}>
                <Typography variant="h6">
                    {userName}`s Gallery
                </Typography>
                <Typography
                    sx={{ color: "inherit", textDecoration: "none", textTransform: "uppercase", fontSize: 18, mr: 1}}
                    component={NavLink}
                    to={"/addNewPicture"}
                >
                    Add new photo
                </Typography>
            </Box>
            <Grid container direction={"row"} spacing={3}>
                {loadingPictures ? (
                    <CircularProgress/>
                ) : (
                    <>
                        {pictures.length === 0 && !loadingPictures ? (
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

export default MyPictures;