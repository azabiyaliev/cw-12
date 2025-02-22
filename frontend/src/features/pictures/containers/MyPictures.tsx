import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectPickedPictures, selectPictures, selectPicturesLoading} from "../picturesSlice.ts";
import React, {useEffect} from "react";
import {deletePictureById, getPickedPicture, getPictures} from "../picturesThunk.ts";
import {NavLink, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    IconButton,
    Typography
} from "@mui/material";
import ModalWindow from "../../../components/ModalWindow/ModalWindow.tsx";
import {apiUrl} from "../../../globalConstants.ts";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import {selectUser} from "../../users/usersSlice.ts";

const MyPictures = () => {
    const user = useAppSelector(selectUser);
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
        if (params.idUser)
            dispatch(getPictures(params.idUser));
    }, [dispatch, params.idUser]);

    const deletePicture = async (id: string) => {
        await dispatch(deletePictureById(id));
        await dispatch(getPictures());
    }

    return (
        <Container maxWidth="lg">
            <Box>
                {loadingPictures ? (
                    <CircularProgress/>
                ) : (
                    <>
                        <Box>
                            {pictures.length === 0 && !loadingPictures ? (
                                <Typography variant="h6">
                                    No pictures yet
                                </Typography>
                            ) : (
                                <>
                                    {pictures.map((picture) => {
                                        return (
                                            <>
                                                <Box sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    mt: 2,
                                                    fontSize: 18,
                                                    textTransform: "uppercase"
                                                }}>
                                                    <Typography variant="h6">
                                                        {userName}`s Gallery
                                                    </Typography>
                                                    {(user && (user.role === "admin" || (user._id === picture.user._id))) ?
                                                        (<Typography
                                                            sx={{
                                                                color: "inherit",
                                                                textDecoration: "none",
                                                                textTransform: "uppercase",
                                                                fontSize: 18,
                                                                mr: 1
                                                            }}
                                                            component={NavLink}
                                                            to={"/addNewPicture"}
                                                        >
                                                            Add new photo
                                                        </Typography>) : null}

                                                </Box>
                                                <Grid container direction={"row"} spacing={3}>
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

                                                                    <CardContent
                                                                        sx={{
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            alignItems: "center"
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="h6"
                                                                            fontWeight="bold"
                                                                        >
                                                                            {picture.title}
                                                                        </Typography>
                                                                        {(user && (user.role === "admin" || (user._id === picture.user._id))) ? (
                                                                            <CardActions>
                                                                                <IconButton
                                                                                    onClick={() => deletePicture(picture._id)}>
                                                                                    <DeleteIcon/>
                                                                                </IconButton>
                                                                            </CardActions>) : null}
                                                                    </CardContent>
                                                                </Box>

                                                            </CardActionArea>
                                                        </Card>
                                                    </Grid>
                                                </Grid>

                                            </>

                                        )
                                    })}
                                </>
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </Container>

    );
};

export default MyPictures;