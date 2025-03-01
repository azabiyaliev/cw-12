import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectDeletePicture,
  selectPickedPictures,
  selectPictures,
  selectPicturesLoading,
} from "../picturesSlice.ts";
import {
  deletePictureById,
  getPickedPicture,
  getPictures,
} from "../picturesThunk.ts";
import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import { apiUrl } from "../../../globalConstants.ts";
import Box from "@mui/material/Box";
import ModalWindow from "../../../components/ModalWindow/ModalWindow.tsx";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../users/usersSlice.ts";
import DeleteIcon from "@mui/icons-material/Delete";

const Pictures = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const pictures = useAppSelector(selectPictures);
  const loading = useAppSelector(selectPicturesLoading);
  const pickedPicture = useAppSelector(selectPickedPictures);
  const deletePictureLoading = useAppSelector(selectDeletePicture);
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    dispatch(getPictures());
  }, [dispatch]);

  const pictureView = async (id: string) => {
    openModal();
    await dispatch(getPickedPicture(id));
  };

  const deletePicture = async (id: string) => {
    await dispatch(deletePictureById(id));
    await dispatch(getPictures());
  };

  return (
    <Container maxWidth="lg">
      <Grid container direction={"row"} spacing={3}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {pictures.length === 0 && !loading ? (
              <Typography variant="h6">No pictures yet</Typography>
            ) : (
              <>
                {pictures.map((picture) => {
                  return (
                    <Grid key={picture._id} size={4}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "93%",
                          maxWidth: 345,
                          mt: 5,
                          borderRadius: 2,
                          boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
                          "&:hover": { boxShadow: 10, color: "#3d5afe" },
                        }}
                      >
                        <Box>
                          <ModalWindow
                            onClose={closeModal}
                            open={open}
                            image={
                              apiUrl +
                              "/" +
                              (pickedPicture ? pickedPicture.image : null)
                            }
                            title={pickedPicture ? pickedPicture.title : ""}
                          />
                          <CardMedia
                            style={{ width: "100%" }}
                            height={400}
                            component="img"
                            image={apiUrl + "/" + picture.image}
                            title={picture.title}
                            onClick={() => {
                              void pictureView(picture._id);
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              height: "50%",
                            }}
                          >
                            <Box>
                              <CardContent>
                                <Typography
                                  variant="h6"
                                  textAlign="center"
                                  fontWeight="bold"
                                >
                                  {picture.title}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                  }}
                                >
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      textDecoration: "none",
                                      color: "inherit",
                                    }}
                                    fontWeight="bold"
                                    to={`/users/${picture.user._id}`}
                                    component={NavLink}
                                  >
                                    By: {picture.user.displayName}
                                  </Typography>
                                  {user && user.role === "admin" ? (
                                    <IconButton
                                      disabled={deletePictureLoading}
                                      onClick={() => deletePicture(picture._id)}
                                    >
                                      <DeleteIcon
                                        sx={{
                                          "&:hover": {
                                            boxShadow: 10,
                                            color: "red",
                                          },
                                        }}
                                      />
                                    </IconButton>
                                  ) : null}
                                </Box>
                              </CardContent>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  );
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
