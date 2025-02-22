import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectPictures, selectPicturesLoading} from "../picturesSlice.ts";
import {getPictures} from "../picturesThunk.ts";
import {useEffect} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {apiUrl} from "../../../globalConstants.ts";
import Box from "@mui/material/Box";


const Pictures = () => {
    const dispatch = useAppDispatch();
    const pictures = useAppSelector(selectPictures);
    const loading = useAppSelector(selectPicturesLoading);

    useEffect(() => {
        dispatch(getPictures());
    }, [dispatch])

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
                                                <CardActionArea to={`/pictures/${picture._id}`} component={NavLink}
                                                                sx={{flexGrow: 1}}>
                                                    <CardMedia
                                                        style={{width: "100%"}}
                                                        height={400}
                                                        component="img"
                                                        image={apiUrl + "/" + picture.image}
                                                        title={picture.title}
                                                    />
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: "50%"
                                                    }}>
                                                        <Box sx={{display: "flex", justifyContent: "center"}}>
                                                            <CardContent>
                                                                <Typography variant="h6" textAlign="center"
                                                                            fontWeight="bold">{picture.title}</Typography>
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